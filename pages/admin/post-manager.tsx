import { AdminLayout, MPItems, ModalAdminDeletePost, ModalBoostProduct, ModalRoomByProduct, PostManagement } from "@/app/components";

export default function PostManager() {
    return (
        <AdminLayout>
    <ModalRoomByProduct />
            <ModalBoostProduct />
            <ModalAdminDeletePost user_id={null} />
                <div className="relative">
                    <div className="flex justify-center py-10">
                        <h1 className="text-gray-600 font-semibold md:text-4xl text-3xl">
                            Quản lý bài đăng
                        </h1>
                    </div>
                    <div className="relative w-full flex flex-col gap-3">
                        <MPItems />
                        {/* <MPUserSlot /> */}
                    </div>
                </div>
        </AdminLayout>
    );
}
