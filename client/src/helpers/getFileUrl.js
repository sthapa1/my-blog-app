import API_ROUTES from '../constants/apiRoutes';
const getFileUrl = (filePath) => {
    return `${API_ROUTES.DOMAIN}/${filePath}`
}

export default getFileUrl;