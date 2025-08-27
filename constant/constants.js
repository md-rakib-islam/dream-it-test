//base url
// export const BASE_URL = "http://192.168.68.127:8000";

export const BASE_URL = "https://backend-dream-tourism-it.onrender.com";

//base url for agents
// export const BASE_URL_AGENT_BOOKING = "http://192.168.68.127:8003";
export const BASE_URL_AGENT_BOOKING = "https://apibustours.dreamtourism.it";

//tour booking
export const tour_content_id = `${BASE_URL_AGENT_BOOKING}/tour_content/api/v1/tour_content/`;

// slidersettings
export const CREATE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/create/`;

export const GET_SLIDERSETTINGID = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/`;

export const GET_SLIDERSETTINGS = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/all/`;

export const UPDATE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/update/`;

export const DELETE_SLIDERSETTING = `${BASE_URL}/homepage_slider/api/v1/homepage_slider/delete/`;

// check_update
export const CHECK_EMAIL_UPDATE = `${BASE_URL}/user/api/v1/user/check_email_when_update/`;

export const CHECK_PRIMARY_PHONE_UPDATE = `${BASE_URL}/user/api/v1/user/check_primary_phone_when_update/`;

export const CHECK_SECONDARY_PHONE_UPDATE = `${BASE_URL}/user/api/v1/user/check_secondary_phone_when_update/`;

export const CHECK_USERNAME_UPDATE = `${BASE_URL}/user/api/v1/user/check_username_when_update/`;

// site_settings
export const CREATE_SITESETTING = `${BASE_URL}/general_setting/api/v1/general_setting/create/`;

export const GET_SITESETTINGID = `${BASE_URL}/general_setting/api/v1/general_setting/`;

export const GET_SITESETTINGS = `${BASE_URL}/general_setting/api/v1/general_setting/all/`;

export const UPDATE_SITESETTING = `${BASE_URL} /general_setting/api/v1/general_setting/update/`;

export const DELETE_SITESETTING = `${BASE_URL} /general_setting/api/v1/general_setting/delete/`;

// cms_blog
export const CREATE_CMS_BLOG = `${BASE_URL}/cms_blog/api/v1/cms_blog/create/`;

export const GET_CMS_BLOGID = `${BASE_URL}/cms_blog/api/v1/cms_blog/`;

export const GET_CMS_BLOG_BY_TITLE = `${BASE_URL}/cms_blog/api/v1/cms_blog/get_blogBy_blog_title_slug`;

export const GET_CMS_BLOGS = `${BASE_URL}/cms_blog/api/v1/cms_blog/all/`;

export const GET_CMS_BLOG_WITHOUT_PAGINATION = `${BASE_URL}/cms_blog/api/v1/cms_blog/without_pagination/all/`;

export const UPDATE_CMS_BLOG = `${BASE_URL}/cms_blog/api/v1/cms_blog/update/`;

export const DELETE_CMS_BLOG = `${BASE_URL}/cms_blog/api/v1/cms_blog/delete/`;

export const SEARCH_CMS_BLOG = `${BASE_URL}/cms_blog/api/v1/cms_blog/search/`;

export const BLOG_CATEGORIES = `${BASE_URL}/cms_blog_category/api/v1/blog_category/without_pagination/all/`;

//menu item
export const MENU_ITEMS = `${BASE_URL}/menu_item/api/v1/menu_item/nested_menu_item_by_user_role/`;

export const CREATE_MENU = `${BASE_URL}/cms_menu/api/v1/cms_menu/create/`;

export const DELETE_MENU = `${BASE_URL}/cms_menu/api/v1/cms_menu/delete/`;

export const GET_MENUS = `${BASE_URL}/cms_menu/api/v1/cms_menu/`;

export const UPDATE_MENU = `${BASE_URL}/cms_menu/api/v1/cms_menu/update/`;

export const GET_MENUS_ALL = `${BASE_URL}/cms_menu/api/v1/cms_menu/all/`;

export const GET_MENUS_ALL_NESTED = `${BASE_URL}/cms_menu/api/v1/cms_menu/get_all_nested_cms_menu/`;

export const GET_MENUS_BY_ROLE = `${BASE_URL}/menu_item/api/v1/menu_item/nested_menu_item_by_role_id/`;

export const SEARCH_MENU = `${BASE_URL}/menu_item/api/v1/menu_item/search/`;

export const GET_MENUS_WITHOUT_PAGINATION = `${BASE_URL}/cms_menu/api/v1/cms_menu/without_pagination/all/`;

//menu content

export const CREATE_CONTENT = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/create/`;

export const DELETE_CONTENT = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/delete/`;

export const GET_CONTENTS = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content`;

export const UPDATE_CONTENT = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/update/`;

export const GET_CONTENTS_ALL = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/all/`;

export const GET_CONTENTS_ALL_NESTED = `${BASE_URL}/cms_menu_content_content/api/v1/get_all_cms_menu_content_content_by_cms_menu_content_id/`;

export const GET_CONTENTS_BY_MENU_ID = `${BASE_URL}/cms_menu_content/api/v1/get_all_cms_menu_content_by_cms_menu_id`;

export const GET_CONTENTS_WITH_URL_BY_MENU_ID = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/get_cms_menu_content_by_cms_menu_id`;

export const GET_CONTENTS_WITHOUT_PAGINATION = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/without_pagination/all/`;

export const GET_CONTENTS_BY_MENU_CONTENT_ID = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content`;

export const GET_CONTENT_BY_TITLE = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content`;

export const GET_CONTENT_BY_MENU_NAME = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/get_cms_menu_content_by_cms_menu_name`;

// Reviews
export const GET_ALL_REVIEWS = `${BASE_URL}/cms_review/api/v1/cms_review/all/`;

// content  images
export const CREATE_IMAGES = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/create/`;

export const DELETE_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/delete/`;

export const GET_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/`;

export const UPDATE_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/update/`;

export const GET_ALL_IMAGE = `${BASE_URL}/cms_menu_content_image/api/v1/cms_menu_content_image/all/`;

export const GET_IMAGE_BY_MENU_ID = `${BASE_URL}/cms_menu_content_image/api/v1/get_all_cms_menu_content_image_list_by_cms_menu_id`;

export const GET_IMAGE_BY_MENU_NAME = `${BASE_URL}/cms_menu_content_image/api/v1/get_all_cms_menu_content_image_list_by_menu_name`;

export const GET_IMAGES_WITHOUT_PAGINATION = `${BASE_URL}/cms_menu_content/api/v1/cms_menu_content/without_pagination/all/`;

// Cms_blog_comments
export const CREATE_CMS_BLOG_COMMENTS = `${BASE_URL}/cms_blog_comments/api/v1/cms_blog_comment/create/`;

export const GET_CMS_BLOG_COMMENTSS = `${BASE_URL}/cms_blog_comments/api/v1/cms_blog_comment/all`;

export const GET_CMS_BLOG_COMMENTSID = `${BASE_URL}/cms_blog_comments/api/v1/cms_blog_comment/`;

export const GET_CMS_BLOG_COMMENTS_BY_BLOG_ID = `${BASE_URL}/cms_blog_comments/api/v1/cms_blog_comment/get_blog_commentBy_blog_title`;

export const UPDATE_CMS_BLOG_COMMENTS = `${BASE_URL}/cms_blog_comments/api/v1/cms_blog_comment/update/`;

export const DELETE_CMS_BLOG_COMMENTS = `${BASE_URL}/cms_blog_comments/api/v1/cms_blog_comment/delete/`;

export const SEARCH_CMS_BLOG_COMMENTS = `${BASE_URL}/cms_blog_comments/api/v1/cms_blog_comment/search/`;

// email and newsletter
export const CREATE_NEWS_LETTER = `${BASE_URL}/email/api/store-and-send-email/`;
export const CREATE_SUBSCRIPTION_WITH_EMAIL = `${BASE_URL}/send-email/api/send-email/`;

// exchange rates api
export const GET_LATEST_EXCHANGE_RATE = `https://v6.exchangerate-api.com/v6/81dd55f0d406c9a2f17b5298/latest/USD`;

// get itenaries
export const GET_ITENARIES_BY_CONTENT_ID = `${BASE_URL}/cms_itinerary/api/v1/Itinerary/get_Itinerary_by_cms_content_id`;

// get Customer location
export const GET_LOCATION_BY_COORDS = `https://api.opencagedata.com/geocode/v1/json`;

// get meta data

export const GET_METADATA_BY_CONTENT_NAME = `${BASE_URL}/cms_meta_data/api/v1/cms_meta_data/get_meta_data_by_cms_content_name`;

// get all countries
export const GET_ALL_COUNTRIES = `${BASE_URL}/country/api/v1/country/without_pagination/all/`;
