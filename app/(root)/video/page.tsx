import Header from "@/components/shared/Header";
import { getUserById } from "@/lib/database/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { videoTypes } from "@/constants";
import StoryForm from "@/components/shared/StoryForm";

const page = () => {
	const { userId } = auth();

	if (!userId) redirect("/sign-in");

	const user = getUserById(userId);

	return (
		<section className='p-0 m-0'>
			<Header title={videoTypes.headerTitle} subtitle={videoTypes.subTitle} />

			<section className='mt-8'>
				<StoryForm userId={userId}></StoryForm>
			</section>
		</section>
	);
};

export default page;
