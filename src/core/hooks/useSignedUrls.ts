import { useEffect, useState } from "react";

import { SignUrlsRequest } from "@/core/models/requests/signUrlsRequest";
import { SignUrls } from "@/core/services/storageService";

import { useRequestAction } from "./useRequestAction";

export function useSignedUrls(paths: (string | undefined | null)[]) {
  const [signedMap, setSignedMap] = useState<Record<string, string>>({});
  const validPaths = paths.filter((p): p is string => !!p);
  const { run } = useRequestAction();

  useEffect(() => {
    if (validPaths.length === 0) {
      setSignedMap({});
      return;
    }

    const fetchSignedUrls = async () => {
      const request: SignUrlsRequest = { urls: validPaths, duration: 60 };
      run(async () => {
        const res = await SignUrls(request);
        setSignedMap(res.data.signedUrls || {});
        console.log(signedMap);
      });
    };

    fetchSignedUrls();
  }, [validPaths.join(",")]); // memoization için güvenli string

  return signedMap;
}
