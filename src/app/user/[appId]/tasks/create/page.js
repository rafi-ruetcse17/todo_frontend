import TaskForm from "@/components/task-form/TaskForm";

export default async function Page({ params }) {
  const { appId } = await params;
  return <TaskForm appId={appId} />;
}
