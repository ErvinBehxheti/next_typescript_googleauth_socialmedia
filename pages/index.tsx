import React, { useEffect, useState } from "react";
import axios from "axios";

import VideoCard from "../components/VideoCard";
import { BASE_URL } from "../utils";
import { Video } from "../types";
import NoResults from "../components/NoResults";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  const [credits, setCredits] = useState({});

  const fetchCredits = async () => {
    try {
      const response = await axios.get(
        "https://www.signalhire.com/api/v1/credits",
        {
          headers: {
            apikey: "202.HO6exLDNJ4ph5T58BDt1SftMFqnD",
          },
        }
      );

      setCredits(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  console.log("credits", credits);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
      ) : (
        <NoResults text={`No Videos`} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};
