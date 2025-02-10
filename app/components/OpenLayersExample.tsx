"use client";
//import "node_modules/ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import point from "ol/geom/Point";
import { Suspense, useEffect, useState } from "react";
import Loading from "./Loading";

export default function OpenLayersExample() {
  const [isClient, setIsClient] = useState(false);
  const [olMap, setOlMap] = useState<Map | null>(null);
  const id = "ol-map";

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
              //캐싱 전략 추가
              tileLoadFunction: function (imageTile: any, src) {
                // 타일 로드 시 캐시를 사용할 수 있는 코드 추가
                const cachedSrc = sessionStorage.getItem(src);
                if (cachedSrc) {
                  imageTile.getImage().src = cachedSrc; // 캐시된 이미지를 사용
                } else {
                  imageTile.getImage().src = src; // 새로 로드
                  imageTile.getImage().onload = () => {
                    sessionStorage.setItem(src, imageTile.getImage().src); // 캐시 저장
                  };
                }
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

  if (!isClient) {
    return null; // 서버 사이드 렌더링 시 컴포넌트가 렌더링되지 않도록 함
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div id={id} style={{ width: "100%", height: "500px" }} />
      </Suspense>
    </>
  );
}
