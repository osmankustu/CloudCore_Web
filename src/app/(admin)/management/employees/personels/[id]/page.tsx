import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import PersonelCard from "@/features/personel/components/cards/PersonelCard";

type pageProps = {
  id: string;
};

const page = ({ params }: { params: pageProps }) => {
  const id = params?.id;
  return (
    <div>
      <PageBreadcrumb pageTitle="Personel Bilgileri" />
      <div>
        <Suspense fallback={<Spinner />}>
          <PersonelCard personelId={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
