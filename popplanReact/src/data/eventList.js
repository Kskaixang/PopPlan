// src/data/eventList.js
const generateRandomDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date(2025, 4, 1);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0]; // 格式：yyyy-mm-dd
};

const eventList = Array.from({ length: 50 }, (_, index) => {
  const randomImageIndex = Math.floor(Math.random() * 3) + 1; // 1~3
  return {
    id: index + 1,
    title: `活動 ${index + 1}`,
    tag: ["樂團", "桌遊", "偶像", "免費"][index % 4],
    description: "這是一場很棒的活動，歡迎參加！",
    image: `src/data/images/Carousel${randomImageIndex}.jpg`,
    date: generateRandomDate(),
  };
});

export default eventList;
