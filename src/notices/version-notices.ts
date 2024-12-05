import * as semVer from 'semver';
import { createInkNoticeTemplate, createNoticeCtaBar, launchPersistentInkNotice } from 'src/components/dom-components/notice-components';
import InkPlugin from "src/main";

///////////
///////////

export function showVersionNotice(plugin: InkPlugin) {
    const curVersion = plugin.manifest.version;

    const lastVersionTipRead = plugin.settings.onboardingTips.lastVersionTipRead;
    const noLastVersionTipRead = !semVer.valid(lastVersionTipRead)
    const updatedToNewerVersion = noLastVersionTipRead || semVer.gt(curVersion, lastVersionTipRead);

    if(updatedToNewerVersion) {
        showChanges(plugin);
    }
}

//////////

function showChanges(plugin: InkPlugin) {

    const noticeBody = createInkNoticeTemplate(1,3);
    noticeBody.createEl('h1').setText(`Changes in Ink v0.3.1`);
    const listEl = noticeBody.createEl('ul');
    // listEl.createEl('li').setText(`Single click unlock for embeds (This is a test, let's see how everyone likes it).`);
    // listEl.createEl('li').setText(`More seamless transitions between locked and unlocked writing embeds.`);
    // listEl.createEl('li').setText(`Unlock multiple writing embeds at once (This is a test. Performance impact is unknown).`);
    // listEl.createEl('li').setText(`Visible grid in drawing mode (Will be optional in the future).`);
    // listEl.createEl('li').setText(`Many changes under the hood to lay groundwork for future updates and better efficiency.`);
    listEl.createEl('li').setText(`Resize drawing embeds (Lock them to save the size).`);
    listEl.createEl('li').setText(`Toggle the grid on and off from the dropdown.`);
    listEl.createEl('li').setText(`Insert commands now have icons.`);
    
    const link = noticeBody.createEl('a');
    link.setAttribute('href', 'https://www.youtube.com/live/gLserf5LLD0?si=mS95cP0fK0d0bryo')
    link.setText(`View release video`);
    // Prevent clicking link from closing notice
    link.onClickEvent( e => e.stopPropagation())
        
    const {
        tertiaryBtnEl
    } = createNoticeCtaBar(noticeBody, {
        tertiaryLabel: 'Dismiss',
    })

    const notice = launchPersistentInkNotice(noticeBody);

    if(tertiaryBtnEl) {
        tertiaryBtnEl.addEventListener('click', () => {
            notice.hide();
            plugin.settings.onboardingTips.lastVersionTipRead = plugin.manifest.version;
            plugin.saveSettings();
        });
    }
    
}