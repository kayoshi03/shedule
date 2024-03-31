import puppeteer from "puppeteer";
import { writeFile } from 'node:fs';

const getData = async (group) => {
    try {
        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();
        await page.goto('https://moodle.preco.ru/blocks/lkstudents/sheduleonline.php');
        await page.locator('#username').wait()
        await page.locator('#username').fill(process.env.KEY_LOGIN);
        await page.locator('#password').wait()
        await page.locator('#password').fill(process.env.KEY_PASSWORD);
        await page.locator('#loginbtn').wait()
        await page.locator('#loginbtn').click();
        await page.locator(".select2-selection__arrow").wait()
        await page.locator(".select2-selection__arrow").click()
        await page.locator(".select2-search__field").wait()
        await page.locator(".select2-search__field").fill(group.get("group"))
        await page.locator("li.select2-results__option").wait()
        await page.locator("li.select2-results__option").click()
        await page.locator("#id_submitbutton").wait()
        await page.locator("#id_submitbutton").click()
        await page.waitForNavigation();
        const scheduleData = await page.evaluate(() => {
            const scheduleBlocks = Array.from(document.querySelectorAll('.urk_sheduleblock'));
            const lessons = [];

            for (const block of scheduleBlocks) {
                const dateElement = block.querySelector('.urk_sheduledate');
                const date = dateElement.textContent.trim();

                const lessonElements = block.querySelectorAll('.urk_lessonblock');
                const dayLessons = [];

                for (const lessonElement of lessonElements) {
                    const timeWindowElement = lessonElement.querySelector('.urk_timewindow');
                    const timeWindowInfo = Array.from(timeWindowElement.querySelectorAll('.urk_timewindowinfo')).map(el => el.textContent.trim());
                    const lessonDescriptionElement = lessonElement.querySelector('.urk_lessondescription');
                    const lessonDescription = lessonDescriptionElement.textContent.trim();

                    dayLessons.push({
                        time: timeWindowInfo[0],
                        startTime: timeWindowInfo[1],
                        endTime: timeWindowInfo[2],
                        subject: lessonDescription.split('\n')[0],
                        teacher: lessonDescription.split('\n')[1],
                        room: lessonDescription.split('\n')[2]
                    });
                }

                lessons.push({
                    date,
                    lessons: dayLessons
                });
            }

            return lessons;
        });
        const json = JSON.stringify(scheduleData, null, 2);
        await writeFile('message.json', json, 'utf8', () => {console.log("Файл создан")});
        await browser.close();
        return 1
    }
    catch (error) {
        return 0
    }
}

export default getData