// Format Datetime to Date only of format DD/MM/YYYY
const formatDate = (date = Date) =>
  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

// Turkey Cities IDs auto-generated
const cities = Array.from(Array(81)).map((_, i) => i + 1);

// Job Categories
const categories = [
  { id: 0, name: 'جميع-الوظائف' },
  { id: 1, name: 'الوظائف-الهندسية' },
  { id: 2, name: 'الوظائف-الطبية' },
  { id: 3, name: 'وظائف-قانونية-واستشارية' },
  { id: 4, name: 'الوظائف-الترجمة' },
  { id: 5, name: 'وظائف-المطاعم' },
  { id: 6, name: 'وظائف-الفنادق' },
  { id: 7, name: 'وظائف-البناء' },
  { id: 8, name: 'وظائف-الرعاية-الصحية' },
  { id: 9, name: 'وظائف-التكنولوجيا' },
  { id: 10, name: 'وظائف-التدريس' },
  { id: 11, name: 'وظائف-خدمة-المنازل-والمكاتب' },
  { id: 12, name: 'وظائف-العقارات' },
  { id: 13, name: 'وظائف-الشحن-والنقل' },
  { id: 14, name: 'وظائف-متفرقة' },
  { id: 15, name: 'وظائف-المحاسبة' },
  { id: 16, name: 'وظائف-المهن-الصناعية-و-الحرفية' },
  { id: 17, name: 'وظائف-السكرتارية' },
  { id: 18, name: 'وظائف-السياحة' },
  { id: 19, name: 'وظائف-الاعلام' },
  { id: 20, name: 'وظائف-المبيعات-والتسويق' },
  { id: 21, name: 'وظائف-الغزل-و-النسيج' },
];

module.exports = {
  formatDate,
  cities,
  categories,
};
