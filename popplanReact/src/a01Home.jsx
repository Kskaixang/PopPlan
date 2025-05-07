import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import TagCardList from "./components/TagCardList";
import LatestEventList from "./components/LatestEventList";

const tagOptions = ["最新", "樂團", "桌遊", "偶像", "免費"];

function Home() {
  const [selectedTag, setSelectedTag] = useState("最新");

  return (
    <Container className="mt-4 p-4 border border-gray bg-white shadow rounded">
      <div className="d-flex gap-2 justify-content-center flex-wrap mb-3">
        {tagOptions.map((tag) => (
          <Button
            key={tag}
            variant={tag === selectedTag ? "primary" : "outline-primary"}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* 顯示「最新」或其他分類 */}
      {selectedTag === "最新" ? (
        <LatestEventList />
      ) : (
        <TagCardList tag={selectedTag} />
      )}
    </Container>
  );
}

export default Home;
