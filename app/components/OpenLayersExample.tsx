"use client";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import point from "ol/geom/Point";
import { Suspense, useEffect, useState } from "react";
import Loading from "./Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// 개별 타일 이미지 로드 함수
const fetchTileImage = async (src: string): Promise<string> => {
  //console.log(`fetchTileImage working for ${src}`);

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve(src);
    image.onerror = (err) => reject(err);
  });
};

export default function OpenLayersExample() {
  const [isClient, setIsClient] = useState(false);
  const [olMap, setOlMap] = useState<Map | null>(null);
  const [imageKeyList, setImageKeyList] = useState<string[]>([]);
  const id = "ol-map";

  const queryClient = useQueryClient();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const center = new point([127, 37])
        .transform("EPSG:4326", "EPSG:3857")
        .getCoordinates();

      const map = new Map({
        target: id,
        layers: [
          new TileLayer({
            source: new OSM({
              tileLoadFunction: function (imageTile: any, src: string) {
                if (!imageKeyList.includes(src)) {
                  setImageKeyList((prev) => [...prev, src]); // 새로운 타일 이미지를 추가
                }
                const _res = queryClient.getQueryData([src]);
                console.log(_res);
                imageTile.getImage().src = src;
              },
            }),
          }),
        ],
        view: new View({
          center,
          zoom: 13,
        }),
      });

      setOlMap(map);
    }
  }, [isClient]);

  return (
    <Suspense fallback={<Loading />}>
      <div id={id} style={{ width: "100%", height: "500px" }} />
      {imageKeyList.map((src) => (
        <TileImageLoader key={src} src={src} />
      ))}
    </Suspense>
  );
}

// 개별적으로 타일 이미지를 로드하는 컴포넌트
function TileImageLoader({ src }: { src: string }) {
  const { data, error } = useQuery({
    queryKey: [src],
    queryFn: () => fetchTileImage(src),
  });

  useEffect(() => {
    if (error) {
      console.error(`Error loading tile: ${src}`, error);
    }
  }, [error]);

  return null;
}
