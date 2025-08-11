'use client';
import React, { useEffect, useState } from 'react';
import Button from '../../../../components/ui/button/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';
import Pagination from '../../../../components/tables/Pagination';
import ServiceStatusTableIndicator from '../../../../components/ui/indicators/ServiceStatusTableIndicator';
import PriortyStatusIndicator from '../../../../components/ui/indicators/PriortyStatusIndicator';
import { formatDate } from '@/Utils/dateFormatter';
import FilterTableButton from '../../../../components/ui/button/FilterTableButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageRequest } from '@/models/request/PageRequest';
import { QueryParserForPageRequest } from '@/Utils/queryParser';
import { useRequestAction } from '@/hooks/useRequestAction';
import { ServiceRecordModel } from '@/models/entity/ServiceRecord/ServiceRecordModel';
import { Paginated } from '@/models/Result/Paginated';
import { DynamicQuery, FilterField, FilterItem, SortItem } from '@/models/request/DynamicQuery';
import { GetListByDynamicServiceRecord } from '@/Services/ServiceService';
import FilteredByIdQueryCard from '../../../../components/ui/filter/FilteredByIdQueryCard';
import { IndividualCustomerModel } from '@/models/entity/IndividualCustomer';

const IndividualCustomerServiceRecordTable = ({
  individualCustomer,
}: {
  individualCustomer: IndividualCustomerModel;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageRequest: PageRequest = QueryParserForPageRequest(searchParams!);
  const [serviceRecords, setServiceRecords] = useState<Paginated<ServiceRecordModel> | undefined>();
  const [dynamicQuery, setDynamicQuery] = useState<DynamicQuery>({
    sort: [],
    filter: {
      field: 'CustomerId',
      filters: [],
      logic: 'and',
      value: `${individualCustomer.id}`,
      operator: 'eq',
      caseSensitive: false,
    },
  });
  const [visible, setVisible] = useState<boolean>(false);
  const { run } = useRequestAction();

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetListByDynamicServiceRecord(
        pageRequest.pageIndex,
        pageRequest.pageSize,
        dynamicQuery!,
      );
      setServiceRecords(data);
    };

    fetchData();
    // run(async()=>{

    // })
  }, [pageRequest.pageIndex, pageRequest.pageSize, dynamicQuery]);

  // FİLTER SECTİON
  const filteredFields: Array<FilterField> = [
    { label: 'Firma Adına Göre', value: 'Customer.Name', type: 'string' },
    { label: "Kayıt Id'sine Göre", value: 'Id', type: 'string' },
    { label: 'Kayıt Koduna Göre', value: 'RecordCode', type: 'string' },
    { label: 'Servis Durumu Göre', value: 'ServicePool.ServiceStatus', type: 'enum' },
    { label: 'Öncelik Durumuna Göre', value: 'Priority', type: 'enum' },
    { label: 'Oluşturma Tarihine Göre ', value: 'CreateAt', type: 'date' },
    { label: 'Güncelleme Tarihine Göre ', value: 'UpdateAt', type: 'date' },
    { label: 'Silinme Tarihine Göre ', value: 'DeleteAt', type: 'date' },
  ];

  const applyFilter = (query: DynamicQuery) => {
    setDynamicQuery((prev) => ({
      ...prev,
      sort: query.sort,
      filter: {
        ...prev.filter,
        filters: query.filter.filters,
      },
    }));
  };

  const dropFilter = (status: Boolean) => {
    if (status) {
      console.log('yan filtre temizlendi');
      setDynamicQuery((prev) => ({
        ...prev,
        sort: [],
        filter: {
          ...prev.filter,
          filters: [],
        },
      }));
    }
  };

  return (
    <>
      {visible ? (
        <>
          <FilteredByIdQueryCard
            filteredFields={filteredFields}
            onApply={(query) => applyFilter(query)}
            clearFilter={(status) => dropFilter(status)}
          />
        </>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Müşteri Servis Kayıtları
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <FilterTableButton
              onClick={() => setVisible(!visible)}
              text={!visible ? 'Filtre' : 'Filtreyi Gizle'}
            />
          </div>
        </div>

        {/* Table  */}
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Müşteri
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Servis Açıklaması
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Durum
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Öncelik
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Tarih
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Son Güncelleme
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  İşlemler
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {serviceRecords?.items.map((rec) => (
                <TableRow key={rec.id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                        {rec.recordCode}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {rec.customerName}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {rec.serviceDescription}
                  </TableCell>
                  <TableCell className="text-theme-sm py-2 text-gray-500 dark:text-white">
                    <ServiceStatusTableIndicator
                      key={rec.id}
                      id={rec.id}
                      serviceStatus={rec.serviceStatus}
                    />
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <PriortyStatusIndicator priorty={rec.priority} key={rec.id} />
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(rec.createAt)}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(rec.updateAt)}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <Button
                      key={rec.id}
                      size="sm"
                      onClick={() => router.push('ServiceRecord/' + rec.id)}
                    >
                      Detay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination
        items={serviceRecords?.count!}
        pageSize={serviceRecords?.size!}
        pageSizes={[20, 50]}
        onChangeSize={(size) =>
          router.push(`/customers/corporate/?pageIndex=${pageRequest.pageIndex}&pageSize=${size}`)
        }
        currentPage={serviceRecords?.index! + 1}
        onBack={() =>
          router.push(
            `/customers/corporate/?pageIndex=${pageRequest.pageIndex - 1}&pageSize=${pageRequest.pageSize}`,
          )
        }
        onChange={(page) =>
          router.push(`/customers/corporate/?pageIndex=${page}&pageSize=${pageRequest.pageSize}`)
        }
        onNext={() =>
          router.push(
            `/customers/corporate/?pageIndex=${pageRequest.pageIndex + 1}&pageSize=${pageRequest.pageSize}`,
          )
        }
        totalPages={serviceRecords?.pages!}
        key={1}
      />
    </>
  );
};

export default IndividualCustomerServiceRecordTable;
