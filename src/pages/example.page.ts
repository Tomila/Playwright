//example.page.ts
import type { Page } from  '@playwright/test';
export class ExampleClass{
    readonly page: Page
    constructor(page:Page){
        this.page=page
    }
    async typeSearchText(){
       await this.page.type('input[name="q"]',"Playwright")
    }
    async pressEnter(){
       await this.page.keyboard.press('Enter');
    }
    async searchResult(){
       return this.page.innerText('//span[contains(text(),"Kymmenen uutiset")]')
    }
    async searchImg(){
        return this.page.url('//url[contains(https://images.cdn.yle.fi/image/upload/c_fill,f_auto,h_64,q_auto:eco/v1665568718/yle-tv1_vtc.png)]')
    }
    async searchSeason(){
            return this.page.innerText('//aria-label[contains(value(),"2")]')
        // return this.page.innerText('//aria-label[contains(text(),"Kausi")]')
    }
    async searchButton(){
        return this.page.innerText('//button[contains(text(),"Kirjaudu")]')
    }
}