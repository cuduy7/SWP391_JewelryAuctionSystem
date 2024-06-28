'use client';

import { useRouter } from 'next/router'; // Importing useRouter from Next.js for navigation
import { IoMdArrowRoundBack } from 'react-icons/io'; // Importing an icon from react-icons
import { Button, Input, Loading } from '../providers'; // Importing custom Button, Input, and Loading components
import dynamic from 'next/dynamic'; // Importing dynamic for dynamic import
import 'react-quill/dist/quill.snow.css'; // Importing styles for ReactQuill
import { useContext, useState } from 'react'; // Importing hooks from React
import { useForm } from 'react-hook-form'; // Importing useForm hook from react-hook-form
import { GlobalContext } from '@/contexts'; // Importing GlobalContext for accessing global state
import { createBlogService } from '@/services'; // Importing createBlogService function
import { CreateBlogForm } from '@/types'; // Importing CreateBlogForm type
import { toast } from 'react-toastify'; // Importing toast for notifications
import { yupResolver } from '@hookform/resolvers/yup'; // Importing yupResolver for validation schema
import {
  createBlogSchema,
  isValidBase64,
  isValidUrl,
  processBase64Image,
} from '@/utils'; // Importing utility functions and validation schema

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Dynamically importing ReactQuill

const CreateBlog = () => {
  const router = useRouter(); // Initializing useRouter
  const [url, setUrl] = useState(''); // State for storing image URL
  const [value, setValue] = useState(''); // State for storing blog content
  const { user, isLoading, setIsLoading } = useContext(GlobalContext) || {}; // Accessing global context

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateBlogForm>({
    resolver: yupResolver(createBlogSchema), // Setting up form validation
  });

  const handleChange = (content: any, delta: any, source: any, editor: any) => {
    setValue(editor.getHTML()); // Updating value state with content from ReactQuill
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setUrl(reader.result.toString()); // Setting URL state with base64 encoded image
      }
    };

    if (file) {
      reader.readAsDataURL(file); // Reading file as Data URL
    } else {
      setUrl('');
    }
  };

  const onSubmit = async (data: CreateBlogForm) => {
    if (setIsLoading) setIsLoading(true);

    // Validating content and image URL
    if (
      !value ||
      value.trim() === '' ||
      value.length < 100 ||
      !url ||
      (!isValidUrl(url) && !isValidBase64(url))
    ) {
      if (!value || value.trim() === '') {
        setError('description', { message: 'Mô tả không được để trống' });
      } else if (value.length < 100) {
        setError('description', { message: 'Mô tả ít nhất 100 kí tự' });
      }

      if (!url) {
        setError('highlightImg', { message: 'Hình ảnh không được để trống' });
      } else {
        if (!isValidUrl(url) && !isValidBase64(url)) {
          setError('highlightImg', {
            message: 'Hình ảnh phải là link hoặc base64',
          });
        }
      }

      if (setIsLoading) setIsLoading(false);
      return;
    }

    if (user && user.id) {
      const res = await createBlogService({
        user_id: user.id,
        title: data.title,
        summary: data.summary,
        description: value,
        imgUrls: [processBase64Image(url)],
        highlightImg: processBase64Image(url),
      });

      if (res.data === null) {
        toast.error(res.message, { position: toast.POSITION.TOP_RIGHT });
        if (setIsLoading) setIsLoading(false);
        return;
      }

      toast.success('Đăng tin tức thành công', {
        position: toast.POSITION.TOP_RIGHT,
      });

      router.push('/admin/post-management'); // Navigating to post management page
    }

    if (setIsLoading) setIsLoading(false);
  };

  return (
    <div className="relative flex flex-col px-6 py-10 gap-5">
      <div
        className="
                    flex 
                    text-gray-600 
                    pb-5
                    space-x-3
                    font-semibold
                    items-center
                "
      >
        <button
          className="relative"
          type="button"
          onClick={() => router.back()}
        >
          <IoMdArrowRoundBack size={40} />
        </button>
        <h1 className="md:text-4xl text-3xl">Tạo tin tức</h1>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-1 text-gray-600 font-semibold text-lg">
            Tiêu đề:
          </div>
          <div className="col-span-4">
            <Input
              placeholder="Nhập tiêu đề"
              colorInput="text-lg"
              name="title"
              id="title"
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-1 text-gray-600 font-semibold text-lg">
            Hình đại diện:
          </div>
          <div className="col-span-4 w-full">
            <div className="flex gap-3 w-full items-center">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Nhập URL hình ảnh hoặc chọn hình ảnh để tải lên"
                  value={url}
                  onChange={(e: any) => setUrl(e.target.value)}
                  colorInput="text-lg w-full"
                  errors={errors}
                />
              </div>
              <div className="flex-shrink-0">
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="custom-file-upload text-lg text-white font-semibold bg-primary-blue-cus px-4 py-4 rounded-lg cursor-pointer hover:text-primary-blue-cus hover:bg-white border border-primary-blue-cus"
                >
                  Chọn hình ảnh
                </label>
                <div className="h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-1 text-gray-600 font-semibold text-lg">
            Đoạn trích:
          </div>
          <div className="col-span-4">
            <Input
              flagInput
              placeholder="Nhập đoạn trích"
              colorInput="text-lg"
              name="summary"
              id="summary"
              register={register}
              errors={errors}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-1 text-gray-600 font-semibold text-lg">
            Nội dung:
          </div>
          <div className="col-span-4">
            <ReactQuill
              className="react-quill"
              placeholder="Nhập nội dung"
              theme="snow"
              value={value}
              onChange={handleChange}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  ['blockquote', 'code-block'],
                  [{ header: 1 }, { header: 2 }],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ script: 'sub' }, { script: 'super' }],
                  [{ indent: '-1' }, { indent: '+1' }],
                  [{ direction: 'rtl' }],
                  [{ size: ['small', false, 'large', 'huge'] }],
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ color: [] }, { background: [] }],
                  [{ font: [] }],
                  [{ align: [] }],
                  ['clean'],
                  ['link', 'image', 'video'],
                ],
              }}
              style={{ height: '300px' }}
            />
          </div>
        </div>
        <div className="relative flex pt-20 justify-end">
          {isLoading ? (
            <Button
              title={<Loading loading={isLoading} color="white" />}
              type="submit"
              style="py-3 text-lg"
              isHover={false}
            />
          ) : (
            <Button title="Đăng bài" type="submit" style="py-3 text-lg" />
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateBlog; // Exporting the component
