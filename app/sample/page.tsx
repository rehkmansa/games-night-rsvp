import { redirect } from "next/navigation";

/** The picker lives at the root now; this keeps older links working. */
export default function SampleIndex() {
  redirect("/");
}
