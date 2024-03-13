
const BASE_URL = "http://localhost:4000/api/v1"
console.log("base url: ", BASE_URL);
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

export const CatalogData={
    CATALOGPAGEDATA_API:BASE_URL+"/course/getCategoryPageDetails",
}

// contact us
export const contactusEndpoint={
    CONTACT_US_API:BASE_URL+"/reach/contact",
}

// setting page api
export const settingEndpoint={
    UPDATEDISPLAY_PICTURE_API:BASE_URL+"/profile/updateDisplayPicture",
    UPDATE_PROFILE_API:BASE_URL+"/profile/updateProfile",
    CHANGE_PASSWORD_API:BASE_URL+"/auth/changepassword",
    DELETE_PROFILE_API:BASE_URL+"/profile/deleteProfile",
}