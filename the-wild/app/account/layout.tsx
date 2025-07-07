import SideNavigation from "../_components/SideNavigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap12">
      <div className="">
        <SideNavigation />
      </div>
      <div className="">{children}</div>
     
    </div>
  );
}