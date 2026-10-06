import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const USERNAME = 'shaky_codes';

const STATS_API_URL =
  `https://leetpulse-api.vercel.app/api/leetcode/solved/${USERNAME}`;

const calendarResponse = await fetch(
  `/api/leetcode?username=shaky_codes&year=${new Date().getFullYear()}`
);

function getDateKeyFromTimestamp(timestamp) {
  const date = new Date(Number(timestamp) * 1000);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function buildSubmissionMap(calendar) {
  const map = new Map();

  if (!calendar) {
    return map;
  }

  let data = calendar;

  if (calendar.data) {
    data = calendar.data;
  }

  if (data.submissionCalendar) {
    data = data.submissionCalendar;
  }

  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      return map;
    }
  }

  if (
    !data ||
    typeof data !== 'object' ||
    Array.isArray(data)
  ) {
    return map;
  }

  Object.entries(data).forEach(
    ([timestamp, count]) => {
      const dateKey =
        getDateKeyFromTimestamp(timestamp);

      map.set(dateKey, Number(count) || 0);
    }
  );

  return map;
}

function getHeatmapWeeks(submissionMap) {
  const endDate = new Date();

  endDate.setHours(0, 0, 0, 0);

  const startDate = new Date(endDate);

  startDate.setDate(
    startDate.getDate() - 364
  );

  /*
   * Start from Sunday so the grid has the same
   * 7-row calendar structure as LeetCode.
   */
  const firstSunday = new Date(startDate);

  firstSunday.setDate(
    firstSunday.getDate() -
      firstSunday.getDay()
  );

  const weeks = [];

  let currentDate = new Date(firstSunday);

  while (currentDate <= endDate) {
    const week = [];

    for (let day = 0; day < 7; day += 1) {
      const dateKey = [
        currentDate.getFullYear(),
        String(
          currentDate.getMonth() + 1
        ).padStart(2, '0'),
        String(
          currentDate.getDate()
        ).padStart(2, '0'),
      ].join('-');

      week.push({
        date: dateKey,
        count:
          submissionMap.get(dateKey) ?? 0,
        isFuture:
          currentDate > endDate,
      });

      currentDate.setDate(
        currentDate.getDate() + 1
      );
    }

    weeks.push(week);
  }

  return weeks;
}

function getActivityLevel(count, maxCount) {
  if (count === 0) {
    return 0;
  }

  if (maxCount <= 1) {
    return 4;
  }

  const ratio = count / maxCount;

  if (ratio <= 0.25) {
    return 1;
  }

  if (ratio <= 0.5) {
    return 2;
  }

  if (ratio <= 0.75) {
    return 3;
  }

  return 4;
}

function formatHeatmapDate(dateString) {
  const date = new Date(
    `${dateString}T00:00:00`
  );

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function LeetCode() {
  const [stats, setStats] = useState(null);
  const [calendar, setCalendar] = useState(null);

  const [loading, setLoading] = useState(true);
  const [calendarLoading, setCalendarLoading] =
    useState(true);

  const [error, setError] = useState(false);
  const [calendarError, setCalendarError] =
    useState(false);

  useEffect(() => {
    async function fetchLeetCodeData() {
      /*
       * Existing solved statistics API.
       */
      try {
        const response = await fetch(
          STATS_API_URL
        );

        if (!response.ok) {
          throw new Error(
            `Stats API returned ${response.status}`
          );
        }

        const data = await response.json();

        setStats(data);
      } catch (err) {
        console.error(
          'LeetCode statistics API error:',
          err
        );

        setError(true);
      } finally {
        setLoading(false);
      }

      /*
       * Actual LeetCode submission calendar.
       */
      try {
        const response = await fetch(
          CALENDAR_API_URL
        );

        if (!response.ok) {
          throw new Error(
            `Calendar API returned ${response.status}`
          );
        }

        const data = await response.json();

        setCalendar(data);
      } catch (err) {
        console.error(
          'LeetCode calendar API error:',
          err
        );

        setCalendarError(true);
      } finally {
        setCalendarLoading(false);
      }
    }

    fetchLeetCodeData();
  }, []);

  const difficultyStats = [
    {
      label: 'Easy',
      value: stats?.easySolved ?? 0,
    },
    {
      label: 'Medium',
      value: stats?.mediumSolved ?? 0,
    },
    {
      label: 'Hard',
      value: stats?.hardSolved ?? 0,
    },
  ];

  /*
   * Convert LeetCode's timestamp → submission count
   * calendar into YYYY-MM-DD → count.
   */
  const submissionMap = useMemo(
    () => buildSubmissionMap(calendar),
    [calendar]
  );

  /*
   * Find the highest number of submissions on a
   * single day. This is used ONLY for visual intensity.
   *
   * The actual tooltip count remains untouched.
   */
  const maxDailySubmissions = useMemo(() => {
    if (submissionMap.size === 0) {
      return 1;
    }

    return Math.max(
      ...Array.from(
        submissionMap.values()
      )
    );
  }, [submissionMap]);

  const weeks = useMemo(
    () => getHeatmapWeeks(submissionMap),
    [submissionMap]
  );

  /*
   * Count the actual active days shown in the
   * last 365 days.
   */
  const activeDays = useMemo(() => {
    return Array.from(
      submissionMap.values()
    ).filter((count) => count > 0).length;
  }, [submissionMap]);

  /*
   * Calculate the current consecutive-day streak.
   */
  const currentStreak = useMemo(() => {
    if (submissionMap.size === 0) {
      return 0;
    }

    let streak = 0;

    const date = new Date();

    date.setHours(0, 0, 0, 0);

    while (true) {
      const dateKey = [
        date.getFullYear(),
        String(
          date.getMonth() + 1
        ).padStart(2, '0'),
        String(
          date.getDate()
        ).padStart(2, '0'),
      ].join('-');

      const count =
        submissionMap.get(dateKey) ?? 0;

      if (count <= 0) {
        break;
      }

      streak += 1;

      date.setDate(
        date.getDate() - 1
      );
    }

    return streak;
  }, [submissionMap]);

  /*
   * Generate month labels.
   */
  const monthLabels = useMemo(() => {
    if (!weeks.length) {
      return [];
    }

    const labels = [];

    let previousMonth = null;

    weeks.forEach((week, index) => {
      const firstDay = week[0];

      if (!firstDay) {
        return;
      }

      const date = new Date(
        `${firstDay.date}T00:00:00`
      );

      const monthKey =
        `${date.getFullYear()}-${date.getMonth()}`;

      if (monthKey !== previousMonth) {
        labels.push({
          index,
          label: date.toLocaleDateString(
            'en-IN',
            {
              month: 'short',
            }
          ),
        });

        previousMonth = monthKey;
      }
    });

    return labels;
  }, [weeks]);

  return (
    <section
      className="leetcode section"
      id="leetcode"
    >
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <p className="section-label">
            04 — LEETCODE
          </p>

          <h2>
            Solving problems,
            <span> one at a time.</span>
          </h2>
        </motion.div>

        <motion.div
          className="leetcode-card"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="leetcode-profile">
            <div>
              <p className="leetcode-label">
                USERNAME
              </p>

              <h3>{USERNAME}</h3>
            </div>

            <a
              href={`https://leetcode.com/u/${USERNAME}/`}
              target="_blank"
              rel="noreferrer"
              className="leetcode-link"
            >
              View Profile ↗
            </a>
          </div>

          <div className="leetcode-total">
            <p>Total Problems Solved</p>

            {loading && (
              <strong className="leetcode-main-number">
                ...
              </strong>
            )}

            {!loading && !error && (
              <motion.strong
                className="leetcode-main-number"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                {stats?.solvedProblem ?? 0}
              </motion.strong>
            )}

            {!loading && error && (
              <strong className="leetcode-main-number">
                —
              </strong>
            )}
          </div>

          <div className="leetcode-difficulties">
            {difficultyStats.map(
              (item, index) => (
                <motion.div
                  className={`difficulty-card difficulty-${item.label.toLowerCase()}`}
                  key={item.label}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <span>{item.label}</span>

                  {loading ? (
                    <strong>...</strong>
                  ) : error ? (
                    <strong>—</strong>
                  ) : (
                    <strong>
                      {item.value}
                    </strong>
                  )}
                </motion.div>
              )
            )}
          </div>

          {/* LEETCODE CONTRIBUTION HEATMAP */}

          <div className="leetcode-heatmap-section">
            <div className="leetcode-heatmap-header">
              <div>
                <p className="leetcode-heatmap-title">
                  Coding activity
                </p>

                <p className="leetcode-heatmap-subtitle">
                  Daily submission activity over
                  the last year
                </p>
              </div>

              {!calendarLoading &&
                !calendarError && (
                  <div className="leetcode-heatmap-summary">
                    <span>
                      {activeDays} active days
                    </span>

                    <span>
                      {currentStreak} day streak
                    </span>
                  </div>
                )}
            </div>

            <div className="leetcode-heatmap-wrapper">
              {calendarLoading && (
                <div className="heatmap-loading">
                  Loading activity...
                </div>
              )}

              {!calendarLoading &&
                calendarError && (
                  <div className="heatmap-loading">
                    Unable to load activity
                  </div>
                )}

              {!calendarLoading &&
                !calendarError &&
                weeks.length > 0 && (
                  <div className="leetcode-heatmap">
                    <div className="heatmap-months">
                      {monthLabels.map(
                        (month) => (
                          <span
                            key={`${month.label}-${month.index}`}
                            style={{
                              left: `${
                                month.index *
                                15
                              }px`,
                            }}
                          >
                            {month.label}
                          </span>
                        )
                      )}
                    </div>

                    <div className="heatmap-grid">
                      {weeks.map(
                        (
                          week,
                          weekIndex
                        ) => (
                          <div
                            className="heatmap-week"
                            key={
                              weekIndex
                            }
                          >
                            {week.map(
                              (day) => {
                                const level =
                                  getActivityLevel(
                                    day.count,
                                    maxDailySubmissions
                                  );

                                return (
                                  <div
                                    className={`heatmap-day level-${level} ${
                                      day.isFuture
                                        ? 'heatmap-day-future'
                                        : ''
                                    }`}
                                    key={
                                      day.date
                                    }
                                    title={`${formatHeatmapDate(
                                      day.date
                                    )} — ${
                                      day.count
                                    } submission${
                                      day.count ===
                                      1
                                        ? ''
                                        : 's'
                                    }`}
                                  />
                                );
                              }
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>

            {!calendarLoading &&
              !calendarError &&
              weeks.length > 0 && (
                <div className="heatmap-legend">
                  <span>Less</span>

                  <span className="legend-square level-0" />
                  <span className="legend-square level-1" />
                  <span className="legend-square level-2" />
                  <span className="legend-square level-3" />
                  <span className="legend-square level-4" />

                  <span>More</span>
                </div>
              )}
          </div>

          <div className="leetcode-status">
            <span
              className={`status-dot ${
                error || calendarError
                  ? 'error'
                  : ''
              }`}
            />

            {loading || calendarLoading
              ? 'Fetching latest statistics...'
              : error && calendarError
                ? 'Unable to fetch LeetCode data'
                : error
                  ? 'Activity loaded · Statistics unavailable'
                  : calendarError
                    ? 'Statistics loaded · Activity unavailable'
                    : 'Live profile statistics & activity'}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default LeetCode;