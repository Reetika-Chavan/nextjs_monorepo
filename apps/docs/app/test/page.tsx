// apps/docs/app/driver/page.tsx
import Image from "next/image";
import { Stack } from "../../lib/contentstack";

type DriverEntry = {
  title: string;
  team?: string;
  teamcolour?: string;
  flag?: string;
  points?: number;
  win?: number;
  images?: { url: string; filename: string }[];
};

async function getDriver(): Promise<DriverEntry | null> {
  try {
    const Query = Stack.ContentType("drivers").Query();
    const [entries] = await Query.toJSON().find();
    return entries?.[0] || null;
  } catch (err) {
    console.error("Driver fetch error:", err);
    return null;
  }
}

export default async function DriverPage() {
  const driver = await getDriver();

  if (!driver) {
    return <p className="p-4 text-red-500">Failed to load driver entry.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{driver.title}</h1>

      {driver.team && (
        <p>
          <strong>Team:</strong> {driver.team}
        </p>
      )}

      {driver.teamcolour && (
        <p>
          <strong>Team Colour:</strong> {driver.teamcolour}
        </p>
      )}

      {driver.flag && (
        <p>
          <strong>Flag:</strong> {driver.flag}
        </p>
      )}

      {typeof driver.points === "number" && (
        <p>
          <strong>Points:</strong> {driver.points}
        </p>
      )}

      {typeof driver.win === "number" && (
        <p>
          <strong>Wins:</strong> {driver.win}
        </p>
      )}

      {driver.images?.length ? (
        <div className="flex gap-4">
          {driver.images.map((img, i) => (
            <Image
              key={i}
              src={img.url}
              alt={img.filename || "Driver image"}
              width={200}
              height={200}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
