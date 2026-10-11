
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/videos/${id}`)
      .then((res) => setVideo(res.data.video || res.data))
      .catch(() => setError("Video could not be loaded."));
  }, [id]);

  if (error) return <p>{error} <Link to="/">Home</Link></p>;
  if (!video) return <p>Loading video...</p>;

  const url = video.videoUrl || "";
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  );
  const embedUrl = match
    ? `https://www.youtube.com/embed/${match[1]}`
    : url;

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2>{video.title}</h2>

      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={video.title || "Video"}
          width="100%"
          height="450"
          style={{ border: 0, background: "#111" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>Video URL not found.</p>
      )}

      <p>{video.description}</p>
      <Link to="/">← Home</Link>
    </div>
  );
}