"use client";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import point from "ol/geom/Point";
import { Suspense, useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function OpenLayersExample() {
  const [isClient, setIsClient] = useState(false);
  const [olMap, setOlMap] = useState<Map | null>(null);
  //const [queryTrigger, setQueryTrigger] = useState(0);
  const imageKeyRef = useRef<string | null>(null); // useRef 사용
  const id = "ol-map";
  const queryClient = useQueryClient();
  const { data, error, refetch } = useQuery<string>({
    queryKey: ["image", imageKeyRef.current], //queryTrigger
    queryFn: async () => {
      return new Promise((resolve, reject) => {
        if (imageKeyRef.current) {
          const image = new Image();
          console.log("queryFn", imageKeyRef.current.toString());
          image.src = imageKeyRef.current.toString();
          image.onload = () => {
            if (imageKeyRef.current) {
              resolve(imageKeyRef.current.toString());
            } else {
              console.log("errrr");
              resolve("imageKeyRef.current is null");
            }
          };
          image.onerror = (err) => {
            console.log("errrr");
            resolve("Image failed to load");
          };
          return;
        }
        resolve("imageKeyRef.current is null");
        return;
      });
    },
    enabled: true,
    // staleTime: 1,
    // gcTime: 1,
  });

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
              tileLoadFunction: async function (imageTile: any, src: string) {
                queryClient
                  .invalidateQueries({
                    queryKey: ["image", src], //queryTrigger
                  })
                  .then(() => {
                    //setQueryTrigger((prev) => Math.random()); // 상태를 변경하여 queryKey를 강제 변경
                    imageKeyRef.current = src; // useRef 사용
                    console.log("src: ");
                    refetch()
                      .then(() => {
                        console.log("");
                        imageTile.getImage().src = src;
                      })
                      .catch((err) => {
                        console.error("refetch err", err);
                      });
                  })
                  .catch((err) => {
                    console.error("invalidateQueries err", err);
                  });
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
    </Suspense>
  );
}
