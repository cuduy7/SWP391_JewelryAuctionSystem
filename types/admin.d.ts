import { UserReportManagement } from '@/app/components';

// Interface representing the response for managing users
export interface ManageUser {
    message: string;  // Message about the response status
    data: {
        userId: string | null;  // User ID
        fullName: string | null;  // Full name of the user
        createDate: string | null;  // Account creation date
        role: string | null;  // Role of the user
        status: string | null;  // Current status of the user
        lastLogin: string | null;  // Last login date
    }[];
}

// Interface representing the data structure for a single user in ManageUser
export interface ManageUserData {
    userId: string | null;  // User ID
    fullName: string | null;  // Full name of the user
    createDate: string | null;  // Account creation date
    role: string | null;  // Role of the user
    status: string | null;  // Current status of the user
    lastLogin: string | null;  // Last login date
}

// Interface representing the response for detailed user management
export interface UserDetailManage {
    message: string;  // Message about the response status
    data: {
        id: string;  // User ID
        fullName: string;  // Full name of the user
        role: string;  // Role of the user
        isBanded: boolean;  // Ban status of the user
        posts?: {
            id: string;  // Post ID
            title: string;  // Title of the post
            postTime: string;  // Time of the post
            numOfReport: number;  // Number of reports on the post
        }[];
    };
}

// Interface representing the data structure for a single post in UserDetailManage
export interface UserManagePostData {
    id: string;  // Post ID
    title: string;  // Title of the post
    postTime: string;  // Time of the post
    numOfReport: number;  // Number of reports on the post
}

// Interface representing the response for user report management
export interface UserReportManagement {
    message: string;  // Message about the response status
    data: {
        id: string;  // Report ID
        content: string;  // Content of the report
        title: string | null;  // Title of the report
        dateReceive: string;  // Date the report was received
        status: string | null;  // Status of the report
        navigationId: string;  // Navigation ID
        objectNavigation: string;  // Object navigation
    }[];
}

// Interface representing the data structure for a single report in UserReportManagement
export interface UserReportManagementData {
    id: string;  // Report ID
    content: string;  // Content of the report
    title: string | null;  // Title of the report
    dateReceive: string;  // Date the report was received
    status: string | null;  // Status of the report
    navigationId: string;  // Navigation ID
    objectNavigation: string;  // Object navigation
}

// Interface representing the response for admin settings
export interface AdminSetting {
    message: string;  // Message about the response status
    data: {
        settingId: string;  // Setting ID
        settingName: string;  // Name of the setting
        settingAmount: number;  // Amount/value of the setting
    }[];
}

// Interface representing the data structure for a single admin setting in AdminSetting
export interface AdminSettingData {
    settingId: string;  // Setting ID
    settingName: string;  // Name of the setting
    settingAmount: number;  // Amount/value of the setting
}

// Interface representing the data structure for a list of admin settings
export interface AdminSettingListData {
    listSettingData: AdminSettingData[];  // List of admin settings
}

// Interface representing the data structure for a single management report
export interface ManagementReportData {
    id: string;  // Report ID
    amount: number;  // Amount involved in the report
    status: string;  // Status of the report
    time: string;  // Time of the report
    type: string;  // Type of report
}

// Interface representing the response for management reports
export interface ManagementReport {
    message: string;  // Message about the response status
    data: {
        historyWalletModels: {
            id: string;  // Report ID
            amount: number;  // Amount involved in the report
            status: string;  // Status of the report
            time: string;  // Time of the report
            type: string;  // Type of report
        }[];
        total: number;  // Total number of reports
    };
}

// Interface representing the data structure for user report detail form
export interface UserReportDetailForm {
    message: string;  // Message about the response status
    data: {
        reportId?: string | null;  // Report ID
        userReportId?: string | null;  // User report ID
        userSendId?: string | null;  // User sender ID
        sendUserName?: string | null;  // Sender username
        reportStatus?: number | null;  // Status of the report
        reportUserName?: string | null;  // Username of the user being reported
        reportType?: number | null;  // Type of report
        titleReport?: string | null;  // Title of the report
        contentReport?: string | null;  // Content of the report
        isBan?: boolean | null;  // Ban status
        reportPost?: {
            postId?: string | null;  // Post ID
            postName?: string | null;  // Post name
            postContent?: string | null;  // Post content
            postDate?: string | null;  // Post date
            postAddress?: string | null;  // Post address
            postImage?: string | null;  // Post image
        };
        reportTrans?: {
            transId?: string | null;  // Transaction ID
            transDate?: string | null;  // Transaction date
            transMoney?: string | null;  // Transaction amount
        };
    };
}

// Interface representing the data structure for user report detail data
export interface UserReportDetailData {
    data: {
        reportId?: string | null;  // Report ID
        userReportId?: string | null;  // User report ID
        sendUserName?: string | null;  // Sender username
        userSendId?: string | null;  // User sender ID
        reportStatus?: number | null;  // Status of the report
        reportUserName?: string | null;  // Username of the user being reported
        reportType?: number | null;  // Type of report
        titleReport?: string | null;  // Title of the report
        contentReport?: string | null;  // Content of the report
        isBan?: boolean | null;  // Ban status
        reportPost?: {
            postId?: string | null;  // Post ID
            postName?: string | null;  // Post name
            postContent?: string | null;  // Post content
            postDate?: string | null;  // Post date
            postAddress?: string | null;  // Post address
            postImage?: string | null;  // Post image
        };
        reportTrans?: {
            transId?: string | null;  // Transaction ID
            transDate?: string | null;  // Transaction date
            transMoney?: string | null;  // Transaction amount
        };
    };
}

// Interface representing the response for a list of withdrawal requests
export interface ListRequestWithdraw {
    message: string;  // Message about the response status
    data: {
        id: string;  // Request ID
        idUser: string;  // User ID
        money: number;  // Amount of money requested
        createDate: string;  // Creation date of the request
        acceptDate: string;  // Acceptance date of the request
        status: number;  // Status of the request
        bankName: string;  // Bank name
        accountName: string;  // Account name
        bankNumber: string;  // Bank account number
    }[];
}