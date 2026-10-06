const LEETCODE_API = 'https://leetcode.com/graphql';

export default async function handler(req, res) {
  try {
    const username = req.query.username || 'shaky_codes';
    const year = req.query.year
      ? Number(req.query.year)
      : new Date().getFullYear();

    const query = `
      query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) {
            activeYears
            streak
            totalActiveDays
            submissionCalendar
          }
        }
      }
    `;

    const response = await fetch(LEETCODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com/',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          year,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(
        `LeetCode returned ${response.status}`
      );
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(
        data.errors[0]?.message || 'LeetCode GraphQL error'
      );
    }

    const calendar =
      data?.data?.matchedUser?.userCalendar;

    if (!calendar) {
      return res.status(404).json({
        error: 'LeetCode user or calendar not found',
      });
    }

    return res.status(200).json(calendar);
  } catch (error) {
    console.error('LeetCode API error:', error);

    return res.status(500).json({
      error: 'Failed to fetch LeetCode activity',
    });
  }
}