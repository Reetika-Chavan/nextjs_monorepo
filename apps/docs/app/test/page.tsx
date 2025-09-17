// apps/docs/app/test/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function DriverPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/testing`, {
    cache: "no-store",
  });

  const { driver, timestamp } = await res.json();

  if (!driver) {
    return <p className="p-4 text-red-500">Failed to load driver entry.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <p className="text-sm text-gray-500">Last rendered at: {timestamp}</p>
      <h1 className="text-2xl font-bold">{driver.title}</h1>

      {driver.images?.length ? (
        <img
          src={driver.images[0].url}
          alt={driver.images[0].filename || "Driver"}
          width={300}
        />
      ) : null}
    </div>
  );
}
