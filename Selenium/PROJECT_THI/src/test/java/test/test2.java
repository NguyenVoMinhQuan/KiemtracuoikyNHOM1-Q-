package test;

import driver.driverFactory;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.AssertJUnit;
import org.testng.annotations.Test;

import java.io.File;

/*
Test Steps:
1. Goto http://live.techpanda.org/
2. Click on �MOBILE� menu
3. In the list of all mobile , read the cost of Sony Xperia mobile (which is $100)
4. Click on Sony Xperia mobile
5. Read the Sony Xperia mobile from detail page. 6. Compare Product value in list and details page should be equal ($100).
*/
public class test2 {
    @Test
    public static void  test02(){
        int scc = 0 ;

        StringBuffer verificationErrors = new StringBuffer();
//Init web-driver
        WebDriver driver = driverFactory.getChromeDriver();

        try{
            //Step 1. Go to http://live.techpanda.org/
            driver.get("http://live.techpanda.org/");
            //2. Click on �MOBILE� menu
            driver.findElement(By.linkText("MOBILE")).click();

            //debug
//            Thread.sleep(500);
            //Step 3. In the list of all mobile , read the cost of Sony Xperia mobile (which is $100)
            String checkb = driver.findElement(By.cssSelector("span[id='product-price-1'] span[class='price']")).getText();
            System.out.println(checkb);
            try {
                AssertJUnit.assertEquals("The product name : ",checkb);
            }catch (Error e){
                verificationErrors.append(e.toString());
            }
            //debug
            //Step 4. Click on Sony Xperia mobile
            new Select(driver.findElement(By.cssSelector("#product-collection-image-1")));
            //Step 5. Read the Sony Xperia mobile from detail page. 6. Compare Product value in list and details page should be equal ($100).
            String innercheck = driver.findElement(By.cssSelector(".h1")).getText();
            System.out.println(innercheck);
            try {
                AssertJUnit.assertEquals("The product name : ",innercheck);
            }catch (Error e){
                verificationErrors.append(e.toString());
            }
            //6. Compare Product value in list and details page should be equal ($100).
            driver.findElement(By.cssSelector("button[title='Add to Cart'] span span")).click();
            scc = (scc +1 );
            File scrFile =((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
            String png =("D:\\ITC\\HTKTUD\\lap\\img\\TC02"+ scc +".png");
            FileUtils.copyFile(scrFile, new File(png));

        }catch(Exception e){
            e.printStackTrace();
        }
        //end
        driver.quit();


    }
}
