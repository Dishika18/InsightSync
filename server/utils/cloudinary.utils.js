import {v2 as cloudinary} from 'cloudinary'


const upload_on_cloudinary = async (filepath) => {
    // Configuration
    cloudinary.config({ 
        cloud_name: 'djfhwhtyy', 
        api_key: '944476654513192', 
        api_secret: 'AbbLeYlaOpNfB1lHWeJACHmJGlg' // Click 'View API Keys' above to copy your API secret
    });
    
    if (!filepath) {
        console.log("file path is not upadating ")
        return null
    }

    const upload_res = await cloudinary.uploader.upload(filepath)
    return upload_res

}

export {upload_on_cloudinary}