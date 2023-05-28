import { BASE_URL} from "@/services";

const downloadFile = (url:string) => {
    let eleLink = document.createElement('a');
    eleLink.href = BASE_URL+url;
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
}
export { downloadFile };
