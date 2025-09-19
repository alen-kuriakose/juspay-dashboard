"use client";
import { DashboardLayout } from "@/layouts";
import { useParams } from 'next/navigation';

export default function ChildDashboardPage() {
  const params = useParams();

  return (
    <div className="bg-white dark:bg-black font-inter">
      <DashboardLayout />
    </div>
  );
}
