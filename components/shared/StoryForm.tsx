"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./StoryForm.module.css";
import { CustomField } from "@/components/shared/CustomField";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { debounce } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CldUploadWidget,
	CloudinaryUploadWidgetResults,
	type CloudinaryUploadWidgetError,
	CloudinaryUploadWidgetInfo,
	CloudinaryUploadWidgetOptions,
} from "next-cloudinary";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { set } from "mongoose";

const StoryForm = ({ userId }: any) => {
	const [video, setVideo] = useState<any>(null);
	const [storyVisible, setStoryVisible] = useState(false);
	const [story, setStory] = useState("");
	const onInputChangeHandler = (
		fieldName: string,
		value: string,
		onChangeField: (value: string) => void
	) => {
		debounce(() => {
			setVideo((prevState: any) => ({
				...prevState,
				[fieldName]: value,
			}));
		}, 1000)();
		console.log(value);
		return onChangeField(value);
	};

	// useEffect(() => {
	// 	const resp = fetch(
	// 		"https://res.cloudinary.com/dcwlhmbw4/video/upload/v1711287346/iksdw7fbkmfm5req9mnj.mp4"
	// 	);

	// 	resp.then((res: any) => {
	// 		console.log("Received Response is:", res);
	// 	});
	// }, []);

	const formSchema = z.object({
		title: z.string(),
		description: z.string(),
		imageFile: z.instanceof(File).nullable(),
	});

	const initialValues: z.infer<typeof formSchema> = {
		title: "",
		description: "",
		imageFile: null,
	};
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialValues,
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setTimeout(() => {
			const resp = fetch("/api/text", {
				method: "post",
				body: JSON.stringify({
					publicId: video.publicId,
					description: values.description,
				}),
			});

			resp.then(async (res: any) => {
				let temp = await res.json();
				console.log("Received Response is:", temp);
				setStory((prevState) => temp.story);
			});

			setStoryVisible((prevState) => true);
		}, 10000);
	}

	//Cloudinary
	type CldUploadEventCallbackWidget = any;
	const onUploadErrorHandler = (
		error: CloudinaryUploadWidgetError,
		{ widget }: CldUploadEventCallbackWidget
	) => {
		toast({
			title: "Something went wrong while uploading",
			description: "Please try again",
			duration: 5000,
			className: "error-toast",
		});
		console.log(error);
	};

	const onUploadSuccessHandler = (
		result: CloudinaryUploadWidgetResults,
		widget: any
	) => {
		const info = result?.info as CloudinaryUploadWidgetInfo;
		setVideo((prevState: any) => ({
			...prevState,
			publicId: info?.public_id,
			width: info?.width,
			height: info?.height,
			secureURL: info?.secure_url,
		}));

		toast({
			title: "Video uploaded successfully",
			description: "1 credit was deducted from your account",
			duration: 5000,
			className: "success-toast",
		});
	};

	const options: CloudinaryUploadWidgetOptions = {
		multiple: false,
		resourceType: "video",
		sources: ["local", "google_drive", "url"],
		singleUploadAutoClose: false,
	};

	return (
		<React.Fragment>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<div className={styles["story-form"]}>
						<CustomField
							control={form.control}
							name='publicId'
							formLabel=''
							className='flex flex-col w-[75%]'
							render={({ field }) => (
								<CldUploadWidget
									uploadPreset='ve0emuef'
									onSuccess={onUploadSuccessHandler}
									onError={onUploadErrorHandler}
									onUploadAdded={(event) => {
										console.log(event);
									}}
									options={options}
								>
									{({ open }) => {
										function onClickHandler() {
											open();
										}
										return video?.publicId ? (
											<div className='hover:shadow-2xl shadow-zinc-400 rounded-lg overflow-clip'>
												<CldVideoPlayer
													width='1280'
													height='720'
													src={video?.publicId}
												/>
											</div>
										) : (
											<>
												<Button
													type='button'
													className='cursor-pointer submit-button capitalize mx-auto'
													onClick={onClickHandler}
												>
													Upload Video
												</Button>
											</>
										);
									}}
								</CldUploadWidget>
							)}
						/>
					</div>
					{video?.publicId ? (
						<>
							<div className='prompt-field'>
								<CustomField
									control={form.control}
									name='description'
									formLabel='Description'
									className='w-4/5 mx-auto'
									render={({ field }) => (
										<Input
											value={field.value}
											className='input-field'
											placeholder='Enter a mini description for your story!'
											onChange={(e) =>
												onInputChangeHandler(
													"description",
													e.target.value,
													field.onChange
												)
											}
										/>
									)}
								/>
								<Button
									type='submit'
									className='capitalize md:w-2/5 md:hover:shadow-lg mt-8 mx-auto submit-button'
									disabled={!video?.publicId}
								>
									Get Story
								</Button>
							</div>
						</>
					) : null}
				</form>
			</Form>
			{storyVisible ? (
				<p
					id='storyBoard'
					className='flex flex-col md:min-h-40 lg:min-h-60 drop-shadow-2xl mt-12 border-2 rounded-md'
				>
					{story}
				</p>
			) : null}
		</React.Fragment>
	);
};

export default StoryForm;
