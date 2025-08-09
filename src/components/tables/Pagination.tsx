import Label from "../form/Label";

// types
type PaginationProps = {
  items: number;
  pageSize: number;
  pageSizes: Array<number>;
  currentPage: number;
  totalPages: number;
  onChangeSize: (size: number) => void;
  onChange: (page: number) => void;
  onNext: () => void;
  onBack: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
  items,
  pageSize,
  pageSizes,
  currentPage,
  totalPages,
  onChangeSize,
  onChange,
  onNext,
  onBack,
}) => {
  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1),
  );

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 pt-6">
      {/* Üst bilgi */}
      <Label className="text-center text-sm text-gray-600 dark:text-gray-400">
        Toplam {totalPages} sayfa içerisinden {currentPage}. sayfayı görmektesiniz.
      </Label>

      {/* Sayfalama butonları */}
      <div className="relative flex w-full items-center justify-center">
        {/* Sol köşe: Toplam kayıt */}
        <div className="absolute left-0 pl-4 text-sm text-gray-600 dark:text-gray-400">
          Toplam Kayıt: {items ?? 0}
        </div>

        <div className="flex items-center">
          <button
            onClick={onBack}
            disabled={currentPage === 1}
            className="shadow-theme-xs mr-2.5 flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Önceki
          </button>

          <div className="flex items-center gap-2">
            {currentPage > 3 && <span className="px-2">...</span>}
            {pagesAroundCurrent.map(page => (
              <button
                key={page}
                onClick={() => onChange(page - 1)}
                className={`rounded px-4 py-2 ${
                  currentPage === page
                    ? "bg-brand-500 text-white"
                    : "text-gray-700 dark:text-gray-400"
                } hover:text-brand-500 dark:hover:text-brand-500 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08]`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages - 2 && <span className="px-2">...</span>}
          </div>

          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="shadow-theme-xs ml-2.5 flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            Sonraki
          </button>
        </div>
      </div>

      {/* Alt: Sayfa boyutu seçici */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Label>Bu sayfada</Label>
        {pageSizes.map(size => (
          <button
            key={size.toString()}
            onClick={() => onChangeSize(size)}
            className={`rounded px-3 py-1 ${
              pageSize === size ? "bg-brand-500 text-white" : "text-gray-700 dark:text-gray-400"
            } hover:text-brand-500 dark:hover:text-brand-500 text-sm font-medium hover:bg-blue-500/[0.08]`}
          >
            {size.toString()}
          </button>
        ))}
        <Label>kayıt listelenecek</Label>
      </div>
    </div>
  );
};

export default Pagination;
