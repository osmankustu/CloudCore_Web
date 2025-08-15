// components/account/Sidebar.tsx
type SidebarProps = {
  items: { id: string; label: string }[];
  activeTab: string;
  onSelect: (id: string) => void;
};

export default function AccountSidebar({ items, activeTab, onSelect }: SidebarProps) {
  return (
    <div className="w-56 rounded-xl bg-white p-2 shadow">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`w-full rounded-lg px-4 py-2 text-left transition ${
            activeTab === item.id ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
