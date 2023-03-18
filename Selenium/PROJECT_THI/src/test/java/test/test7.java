package test;

import driver.driverFactory;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;

// *   Note: This TestCase7a version is due to the below amended steps.
//         *
//         Test Steps:
//         1. Go to http://live.techpanda.org/
//         2. Click on My Account link
//         3. Login in application using previously created credential
//         4. Click on 'My Orders'
//         5. Click on 'View Order'
//         6. *** note: After steps 4 and 5, step 6 "RECENT ORDERS" was not displayed
//         Verify the previously created order is displayed in 'RECENT ORDERS' table and status is Pending
//         7. Click on 'Print Order' link
//         8. *** note: the link was not found.
//         Click 'Change...' link and a popup will be opened as 'Select a destination' , select 'Save as PDF' link.
public class test7 {
    @Test
    public static void  test07(){
        int scc = 0 ;

        StringBuffer verificationErrors = new StringBuffer();
//Init web-driver
        WebDriver driver = driverFactory.getChromeDriver();

        try{
            //Step 1. Go to http://live.techpanda.org/
            driver.get("http://live.techpanda.org/");
            //Step 2. Click on my account link
            driver.findElement(By.cssSelector("a[class='skip-link skip-account'] span[class='label']")).click();
            //debug
//            Thread.sleep(500);
            //Step 3. login
            driver.findElement(By.cssSelector("a[title='Log In']")).click();
            //điền vào form
            driver.findElement(By.cssSelector("#email")).sendKeys("minhquan@gmail.com");
            driver.findElement(By.cssSelector("#pass")).sendKeys("123456");

            //step4. Click login
            driver.findElement(By.id("send2")).click();

            Thread.sleep(2000);

//            4. Click on 'My Orders'
            driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/ul[1]/li[4]/a[1]")).click();
//            5. Click on 'View Order'
            driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/table[1]/tbody[1]/tr[1]/td[6]/span[1]/a[1]")).click();
            //6
            driver.findElement(By.xpath("//h1[normalize-space()='Order #100018146 - Pending']")).getText();
            //7
            driver.findElement(By.xpath("//a[@class='link-print']")).click();
            //8
            driver.findElement(By.xpath("//a[@class='link-print']")).sendKeys("Lưu Dưới Dạng PDF");

        }catch(Exception e){
            e.printStackTrace();
        }
        //end
        driver.quit();


    }
}
