"use client";
import React, { useState } from "react";
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

const StoryForm = ({ userId }: any) => {
	const [video, setVideo] = useState<any>(null);
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
	async function onSubmit(values: z.infer<typeof formSchema>) {}

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

		console.log("Received data:", info);
		console.log("The widget is", widget);

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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'></form>

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
				</div>
			) : null}
		</Form>
	);
};

export default StoryForm;
