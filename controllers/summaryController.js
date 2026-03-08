const summaryService = require("../services/summaryService");
const cache = require("../services/cacheService");
const fileService = require("../services/fileService");

exports.getSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;

    let { month, year } = req.query;

    const now = new Date();

    // fallback to current month/year if not provided
    month = month ? Number(month) : now.getMonth() + 1;
    year = year ? Number(year) : now.getFullYear();

    // basic validation
    if (isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        message: "Invalid month value"
      });
    }

    if (isNaN(year) || year < 2000) {
      return res.status(400).json({
        success: false,
        message: "Invalid year value"
      });
    }

    const cacheKey = `summary-${userId}-${month}-${year}`;

    // check cache first
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        cached: true,
        data: cached
      });
    }

    // compute summary
    const summary = await summaryService.calculateSummary(
      userId,
      month,
      year
    );

    // save summary JSON report
    await fileService.saveReport(summary);

    // store in cache for 60 seconds
    cache.set(cacheKey, summary, 60000);

    res.json({
      success: true,
      cached: false,
      data: summary
    });

  } catch (err) {
    next(err);
  }
};

// exports.getSummary = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const month = Number(req.query.month);
//     const year = Number(req.query.year);

//     const cacheKey = `summary-${userId}-${month}-${year}`;

//     const cached = cache.get(cacheKey);

//     if (cached) {
//       return res.json({
//         success: true,
//         cached: true,
//         data: cached
//       });
//     }

//     const summary = await summaryService.calculateSummary(
//       userId,
//       month,
//       year
//     );

//     // save summary to json file (fs/promises requirement)
//     await fileService.saveReport(summary);

//     cache.set(cacheKey, summary, 60000);

//     res.json({
//       success: true,
//       cached: false,
//       data: summary
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getSummary = async (req, res, next) => {
//   try {
//     const userId = req.user.id;

//     const cacheKey = `summary-${userId}`;
//     const cached = cache.get(cacheKey);

//     if (cached) {
//       return res.json({
//         success: true,
//         cached: true,
//         data: cached
//       });
//     }

//     const summary = await summaryService.calculateSummary(userId);

//     cache.set(cacheKey, summary, 60000);

//     res.json({
//       success: true,
//       cached: false,
//       data: summary
//     });
//   } catch (err) {
//     next(err);
//   }
// };
