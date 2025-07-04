/**
 * @name FakeAvatarDecoration
 * @author Bduidan
 * @authorId 1107673955273285693
 * @website https://vcfad.vercel.app/bd/
 * @source https://github.com/Alex9600t/BD-Fake-Avatar-Decoration-Plugin
 * @description Simple plugin to add a fake Avatar decoration visible to all users who have the plugin installed.
 * @version 0.0.2
 */

let observe_44b0c;
let observe_c19a55;
// -----Main-----
module.exports = class FAD {
    start() {
        init();
        run();
    }

    stop() {
        end();
    }

    getSettingsPanel() {
        let template = document.createElement("template");
        template.innerHTML = `<div>${settings()}</div>`;
        return template.content.firstElementChild;
    }
}

function init() {
    console.log("Hello from FAD!");
    // c19a55
    observe_c19a55 = update("avatar_c19a55", (el) => {
        BdApi.Net.fetch(`https://vcfad.vercel.app/avatarDecoration/${el.src.split("/")[4]}`)
            .then(r => r.status !== 200
                ? BdApi.Net.fetch(`https://mirror-vcfad.vercel.app/avatarDecoration/${el.src.split("/")[4]}`)
                : r
            )
            .then(r => r.json())
            .then(data => {
                if (data.status === 0) {
                    const newDecoration = document.createElement('img');
                    newDecoration.className = "avatarDecoration_c19a55 fad_ad";
                    newDecoration.ariaHidden = "true";
                    newDecoration.src = `${data.url}`;

                    if (el.parentNode) {
                        el.parentNode.insertBefore(newDecoration, el.nextSibling);
                    }
                }
            })
    });

    // 44b0c
    observe_44b0c = update("wrapper__44b0c", (el) => {
        BdApi.Net.fetch(`https://vcfad.vercel.app/avatarDecoration/${el.querySelector('.avatar__44b0c').src.split("/")[4]}`)
            .then(r => r.status !== 200
                ? BdApi.Net.fetch(`https://mirror-vcfad.vercel.app/avatarDecoration/${el.querySelector('.avatar__44b0c').src.split("/")[4]}`)
                : r
            )
            .then(r => r.json())
            .then(data => {
                if (data.status === 0) {
                    const newDecoration = document.createElement('svg');
                    newDecoration.setAttribute("width", "108");
                    newDecoration.setAttribute("height", "96");
                    newDecoration.setAttribute("viewBox", "0 0 108 96");
                    newDecoration.className = "avatarDecoration__44b0c fad_ad";
                    newDecoration.ariaHidden = "true";
                    newDecoration.innerHTML = `<foreignObject x="0" y="0" width="96" height="96" mask="url(#svg-mask-avatar-decoration-status-round-80)">
                                                <div class="avatarStack__44b0c"><img class="avatar__44b0c" alt=" " aria-hidden="true" src="${data.url}" as="image">
                                                </div></foreignObject>`;

                    el.appendChild(newDecoration);
                }
            })
    })
}

function end() {
    document.removeEventListener('click', (el) => {
        let tmp = el.target;
        if (Array.from(el.target.classList).find(className => className.startsWith('vc_fda_bd_s_btn'))) {
            vc_fad_input()
        } else {
            for (let i = 0; i < 3; i++) {
                if (Array.from(tmp.parentNode.classList).find(className => className.startsWith('vc_fda_bd_s_btn'))) {
                    vc_fad_input();
                    break;
                } else {
                    tmp = tmp.parentNode;
                }
            }
        }
    });

    document.querySelectorAll('.fad_ad').forEach(el => {
        el.remove();
    });
    observe_44b0c.disconnect();
    observe_c19a55.disconnect();
}

function run() {
    document.addEventListener('click', (el) => {
        let tmp = el.target;
        if (Array.from(el.target.classList).find(className => className.startsWith('vc_fda_bd_s_btn'))) {
            vc_fad_input()
        } else {
            for (let i = 0; i < 3; i++) {
                if (Array.from(tmp.parentNode.classList).find(className => className.startsWith('vc_fda_bd_s_btn'))) {
                    vc_fad_input();
                    break;
                } else {
                    tmp = tmp.parentNode;
                }
            }
        }
    });

    // 37e49 // WHAT?? Only BD use it.
    const ad01 = document.querySelector('.avatar__37e49');
    BdApi.Net.fetch(`https://vcfad.vercel.app/avatarDecoration/${ad01.querySelector('.avatar__44b0c').src.split("/")[4]}`)
        .then(r => r.status !== 200
            ? BdApi.Net.fetch(`https://mirror-vcfad.vercel.app/avatarDecoration/${ad01.querySelector('.avatar__44b0c').src.split("/")[4]}`)
            : r
        )
        .then(r => r.json())
        .then(data => {
            if (data.status === 0) {
                const newDecoration = document.createElement('svg');
                newDecoration.setAttribute("width", "57");
                newDecoration.setAttribute("height", "48");
                newDecoration.setAttribute("viewBox", "0 0 57 48");
                newDecoration.className = "avatarDecoration__44b0c fad_ad";
                newDecoration.ariaHidden = "true";
                newDecoration.innerHTML = `<foreignObject x="0" y="0" width="48" height="48" mask="url(#svg-mask-avatar-decoration-status-round-40)">
                                            <div class="avatarStack__44b0c"><img class="avatar__44b0c" alt=" " aria-hidden="true" src="${data.url}" as="image">
                                            </div></foreignObject>`;

                ad01.appendChild(newDecoration);
            }
        })
}
// -----/Main-----

function vc_fad_input() {
    const data = document.querySelector('.vc_fda_bd_s_input').value;

    if (data && data !== "") {
        BdApi.Net.fetch("https://vcfad.vercel.app/setAvatarDecoration", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "url": `${data}` }), redirect: "follow" })
            .then((response) => response.json())
            .then((result) => {
                window.open("https://discord.com/oauth2/authorize?client_id=1387953781475377212&response_type=code&redirect_uri=https%3A%2F%2Fvcfad.vercel.app%2Ffad%2Fredirection&scope=identify", "_blank");
            })
            .catch((error) => console.error(error));
    }
}
// -----Settings-----
function settings() {
    const blockH2 = (el => { return `<h2 class="h5_b717a1 eyebrow_b717a1 defaultMarginh5_b717a1" style="margin-bottom: 0px" id=":r6k:">${el}</h2>` });
    const blockSub = (el => { return `<div class="colorStandard_c9946a size14_a4e6b9 description_ddd181 formText_ddd181 marginTop8_fd297e modeDefault_ddd181">${el}</div>` });
    const blockInput = ((b0, b1) => { return `<div class="fieldWrapper_ce6bbd">${b0}<div class="inputWrapper__0f084"><input class="inputDefault__0f084 input__0f084 vc_fda_bd_s_input" title="" note="" placeholder="e.g. a_48b8411feb1e80a69048fc65b3275b75" aria-labelledby=":r6k:" value="" name=""></div>${b1}</div>` });
    const blockBtn = (el => { return `<button class="bd-button bd-button-filled bd-button-color-brand bd-button-medium bd-button-grow vc_fda_bd_s_btn"><div class="bd-button-content">${el}</div></button>` });

    return (`${blockH2("Update Avatar Decoration")}${blockInput(blockSub(`Enter ID. If you don’t know it, you can <a onclick='window.open("https://vcfad.vercel.app/list", "_blank")'>view all IDs</a>`), blockSub(""))} 
    ${blockBtn("Publish", () => { console.log("Hey") })}
    <div class="colorStandard_c9946a size14_a4e6b9 description_ddd181 formText_ddd181 marginTop8_fd297e modeDefault_ddd181" style="font-size: 7px; line-height: 7px;">By clicking the <b>Publish</b> button, a Discord OAuth2 window will open. This is required to verify your identity and ensure you're authorized to make changes. We only receive your <b>Discord User ID</b>. No other personal data is collected. You can <a href='https://vcfad.vercel.app/avatardecoration' target='_blank'>view all data on the server</a>.</div>`)
}

function update(cl, callback) {
    const observer = new MutationObserver((mtl) => {
        mtl.forEach((mt) => {
            mt.addedNodes.forEach((nd) => {
                if (!(nd instanceof Element)) {
                    return;
                }

                if (nd.classList.contains(`${cl}`)) {
                    callback(nd);
                }

                nd.querySelectorAll?.(`.${cl}`).forEach((el) => {
                    callback(el);
                })
            })
            if (mt.type === "attributes" && (mt.target instanceof Element) &&
                mt.target.classList.contains(`${cl}`)) {
                callback(mt.target);
            }
        })
    })

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"]
    })

    return observer;
}
// -----/Settings-----