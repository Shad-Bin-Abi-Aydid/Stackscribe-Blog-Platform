import { Button } from "@/components/ui/button";
import { userServices } from "@/services/user.services";

export default async function Home() {
  const { data } = await userServices.getSession();

  console.log(data);
  return (
    <div>
      <Button variant="outline">Click Me</Button>
    </div>
  );
}
