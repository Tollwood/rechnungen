import API from "../API";
import Company from "../employees/Company";
import ErrorMapper from "../ErrorMapper";

export default class CompanyService {


    public static get(onSuccess: (company: Company) => void): Promise<any> {
        return API.get('/api/company/1')
            .then(result => result.data)
            .then(data => onSuccess(data));
    }

    static save(company: Company, company2: Company, onSuccess: () => void, onError: (errors: Map<string, string>) => void, selectedCompanyLogo?: File, selectedThankYouImage?: File) {
        API.patch(company._links.self!.href, company)
            .then(() => {
                if (selectedCompanyLogo && selectedThankYouImage) {
                    CompanyService.addImage(company._links.self!.href + "/image", selectedCompanyLogo, "logo", () => {
                        CompanyService.addImage(company._links.self!.href + "/image", selectedThankYouImage, "thankYouImage", onSuccess);
                    });
                } else if (selectedCompanyLogo && selectedThankYouImage === undefined) {
                    CompanyService.addImage(company._links.self!.href + "/image", selectedCompanyLogo, "logo", onSuccess);
                } else if (selectedThankYouImage && selectedCompanyLogo === undefined) {
                    CompanyService.addImage(company._links.self!.href + "/image", selectedThankYouImage, "thankYouImage", onSuccess);
                } else {
                    onSuccess()
                }
            })
            .catch(error => {
                ErrorMapper.map(error, onError)
            });

    }

    private static addImage(url: string, image: File, type: string, onSuccess: () => void) {
        const formData = new FormData();
        formData.append('file', image);
        API.post(url + "?type=" + type, formData)
            .then(onSuccess)
    }
}