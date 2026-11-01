const originalPage = document.getElementById("firstpage").innerHTML;

const pageHistory = [];

function addPreviousButton() {
    const page = document.getElementById("firstpage");

    let button = document.getElementById("previousPage");

    if (pageHistory.length === 0) {
        if (button) button.remove();
        return;
    }

    if (!button) {
        button = document.createElement("button");
        button.id = "previousPage";
        button.textContent = "← Previous";
        button.className = "previous-page";
        button.onclick = goToPreviousPage;
        page.appendChild(button);
    } else {
        button.onclick = goToPreviousPage;
    }
}

function goToPreviousPage() {
    if (pageHistory.length === 0) return;

    const page = document.getElementById("firstpage");

    page.innerHTML = pageHistory.pop();

    addPreviousButton();
}

// Save the page before its buttons change it.
document.addEventListener("click", function (event) {
    const page = document.getElementById("firstpage");
    const button = event.target.closest("#firstpage button");

    if (!button || button.id === "previousPage") return;

    const snapshot = page.cloneNode(true);

    // Don't save the Previous button as part of the page.
    const oldButton = snapshot.querySelector("#previousPage");
    if (oldButton) oldButton.remove();

    // Preserve anything the reader has typed.
    snapshot.querySelectorAll("textarea").forEach((field, index) => {
        const originalFields = page.querySelectorAll("textarea");
        if (originalFields[index]) {
            field.textContent = originalFields[index].value;
        }
    });

    snapshot.querySelectorAll("input").forEach((field, index) => {
        const originalFields = page.querySelectorAll("input");
        if (originalFields[index]) {
            field.setAttribute("value", originalFields[index].value);
        }
    });

    pageHistory.push(snapshot.innerHTML);
}, true);

// Show Previous whenever a new page appears.
const pageObserver = new MutationObserver(() => {
    addPreviousButton();
});

pageObserver.observe(document.getElementById("firstpage"), {
    childList: true
});

function entertheworld() {
    const book = document.getElementById("book");
    const cover = document.getElementById("bookCover");
    const page = document.getElementById("firstpage");

    book.classList.add("is-open");
    cover.style.transform = "rotateY(-160deg)";

    page.style.pointerEvents = "none";

    setTimeout(() => {
        page.style.pointerEvents = "auto";
    }, 1500);
}

function goBack() {
    const book = document.getElementById("book");
    const cover = document.getElementById("bookCover");
    const page = document.getElementById("firstpage");

    page.innerHTML = originalPage;

    cover.style.transform = "rotateY(0deg)";
    book.classList.remove("is-open");
}

function showResponse() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <p class="page-label">OH, HELLO AGAIN</p>

        <div class="page-content">
            <h1>Oh. You were paying attention.</h1>
            <p><em>I wasn't expecting that.</em></p>
            <p>Well, since you're here...</p>
            <h2>I've been thinking about something.</h2>
            <button onclick="showFirstThought()">Tell me.</button>
        </div>
    `;
}

function showFirstThought() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <p class="page-label">A THOUGHT THAT ESCAPED</p>

        <div class="page-content">
            <h1>Have you ever noticed?</h1>

            <p>You can spend an entire day thinking about your life...</p>

            <p>Analyse a conversation from three hours ago.
            Imagine one that hasn't happened yet.
            Rewrite something you said in 2022.</p>

            <p>And somewhere in between, you forget
            that you're literally here.</p>

            <p><em>Breathing. Existing. Probably sitting
            in a questionable posture.</em></p>

            <p>Anyway.</p>

            <h2>You came here to read something.
            Now you're being perceived.</h2>

            <button onclick="showUnexpected()">
                Let's pretend this didn't happen.
            </button>
        </div>
    `;
}

function showUnexpected() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <p class="page-label">CONGRATULATIONS</p>

        <div class="page-content">
            <h1>You successfully avoided having a thought.</h1>

            <p>Your reward:</p>

            <h2>Absolutely nothing.</h2>

            <p><em>We appreciate your participation.</em></p>

            <p>There was no participation.</p>

            <div class="choice-buttons">
                <button onclick="showLeaving()">I'm leaving.</button>

                <button onclick="showStaying()">I'd like to hear more.</button>
            </div>
        </div>
    `;
}

function showLeaving() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
    <p class="page-label">WAIT A MINUTE</p>

    <div class="page-content">
        <h1>WHAT?</h1>

        <p>Was that rude?</p>

        <p>Ohh, come on. I'm not that bad.</p>

        <p>I mean, I gave you absolutely nothing, and you're leaving already?</p>

        <p>Fair enough, honestly.</p>

        <p>...</p>

        <p>Wait.</p>

        <p>You know what? I was going to say something, but never mind.</p>

        <p>Actually, no. Now I feel like saying it.</p>

        <button onclick="showKindnessIntro()">Okay, what is it?</button>
    </div>
`;
}

function showStaying() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <p class="page-label">OH, REALLY?</p>

        <div class="page-content">
            <h1> YOU WANNA HEAR MORE?</h1>

            <p>Really?</p>

            <p>After everything I've just said?</p>

            <p>I gave you absolutely nothing, and you voluntarily chose to stay.</p>

            <p>Interesting.</p>

            <p>I could tell you something profound now, but that would put a lot of pressure on me.</p>

            <p>And frankly, I wasn't prepared for an audience.</p>

            <p>...</p>

            <p>You're being awfully patient with me.</p>

            <p>Actually, you know what? Never mind.</p>

            <p>I shouldn't start assuming things about people just because they clicked a button.</p>

            <p>You might be curious. You might be bored. You might have clicked the wrong button.</p>

            <p>I don't know you like that.</p>

            <button onclick="showKindnessIntro()">Okay, now I'm curious.</button>
        </div>
    `;
}

function showKindnessIntro() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <p class="page-label">ANYWAY...</p>

        <div class="page-content">
            <p>People will tell you not to be too kind.</p>

            <p>Apparently, others will use you.</p>

            <p>So don't care so much. Don't be so nice. Be a baddie.</p>

            <p>And I'm sitting here thinking...</p>

            <h2>But what if someone actually likes being nice?</h2>

            <p>What if being kind feels good to them?</p>

            <p>Are they supposed to start acting like someone they're not just because someone else might take advantage of them?</p>

            <p>That's a little strange, isn't it?</p>

            <p>Someone else behaves badly, and suddenly the one who's nice is getting a personality makeover.”</p>
            <p><em>Interesting solution.</em></p>

            <button onclick="showKindnessNext()">Let the nonsense continue.</button>
        </div>
    `;
}

function showKindnessNext() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <p class="page-label">AN UNRELATED DEVELOPMENT</p>

        <div class="page-content">
            <h1>Anyway.</h1>

            <p>A tiny frog has entered the conversation.</p>

            <p>He has no qualifications to discuss kindness.</p>

            <p>He doesn't even know what a boundary is.</p>

            <p>He ate a fly five minutes ago and has been feeling pretty good about himself ever since.</p>

            <h2>🐸</h2>

            <p>He would like you to know that you don't have to become a worse person just because someone else forgot how to be a decent one.</p>

            <p><em>Actually, he didn't say that. I made it up.</em></p>

            <p>The frog would like to return to his pond.</p>

            <button onclick="showFrogLeaves()">Let him go.</button>
        </div>
    `;
}

function showFrogLeaves() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <p class="page-label">POND DEPARTMENT</p>

        <div class="page-content frog-scene">
            <h1>And he goes off...</h1>

            <div class="frog-stage">
                <svg class="walking-frog" viewBox="0 0 180 140"
                     xmlns="http://www.w3.org/2000/svg">

                    <!-- Back legs -->
                    <g class="frog-back-legs">
                        <path d="M55 83 Q30 94 25 112 Q43 120 61 105"
                              fill="#65a84d" stroke="#356b35"
                              stroke-width="3" stroke-linejoin="round"/>
                        <ellipse cx="32" cy="113" rx="15" ry="7"
                                 fill="#65a84d" stroke="#356b35"
                                 stroke-width="3"/>
                    </g>

                    <!-- Body -->
                    <ellipse cx="85" cy="84" rx="43" ry="30"
                             fill="#79bd59" stroke="#356b35"
                             stroke-width="3"/>

                    <!-- Belly -->
                    <ellipse cx="91" cy="91" rx="25" ry="19"
                             fill="#d8e99a"/>

                    <!-- Front legs -->
                    <g class="frog-front-legs">
                        <path d="M103 96 Q120 108 133 113"
                              fill="none" stroke="#356b35"
                              stroke-width="9" stroke-linecap="round"/>
                        <ellipse cx="136" cy="115" rx="13" ry="6"
                                 fill="#79bd59" stroke="#356b35"
                                 stroke-width="3"/>
                    </g>

                    <!-- Head -->
                    <ellipse cx="107" cy="52" rx="37" ry="31"
                             fill="#79bd59" stroke="#356b35"
                             stroke-width="3"/>

                    <!-- Eyes -->
                    <circle cx="85" cy="29" r="13"
                            fill="#79bd59" stroke="#356b35"
                            stroke-width="3"/>
                    <circle cx="123" cy="29" r="13"
                            fill="#79bd59" stroke="#356b35"
                            stroke-width="3"/>

                    <circle cx="87" cy="30" r="6" fill="white"/>
                    <circle cx="125" cy="30" r="6" fill="white"/>
                    <circle cx="89" cy="31" r="3.5" fill="#222"/>
                    <circle cx="127" cy="31" r="3.5" fill="#222"/>

                    <!-- Tiny smile -->
                    <path d="M91 60 Q106 72 122 59"
                          fill="none" stroke="#356b35"
                          stroke-width="3" stroke-linecap="round"/>

                    <!-- Tiny cheek -->
                    <circle cx="79" cy="53" r="5" fill="#a6d878"/>
                </svg>
            </div>

            <p><em>Please respect his privacy.</em></p>
        </div>
    `;

    setTimeout(() => {
        page.innerHTML = `
            <p class="page-label">POND DEPARTMENT</p>

            <div class="page-content">
                <h1>He's gone.</h1>
                <p>You let him go.</p>
                <p>He hopped away without saying goodbye.</p>
                <p>Honestly, a little rude.</p>
                <p>But we respect his decision.</p>
                <h2>🐸 · · ·</h2>
                <p><em>Three tiny dots. That's all he left behind.</em></p>
                <button onclick="showFrogAfterthought()">Let's move.</button>
            </div>
        `;
    }, 3500);
}

function showFrogAfterthought() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <p class="page-label">RIGHT. WHERE WERE WE?</p>

        <div class="page-content">
            <h1>Okay. Back to business.</h1>

            <p>...</p>

            <p>What business?</p>

            <p>I don't know.</p>

            <p>The frog distracted me.</p>

            <button onclick="showDiyaMoment()">Let's look at something.</button>
        </div>
    `;
}

function showDiyaMoment() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="diya-page">

            <img
                src="images/two-diyas.jpg"
                alt="Two diyas glowing in a dark corner"
                class="diya-photo"
                decoding="async"
            >

            <div class="diya-thought">
                <p>So, I saw these two.</p>

                <p>Amidst all the festive lights, they were just there, lighting up a little corner.</p>

                <p>And I thought...</p>

                <p><em>Hang on. They're not burning themselves to give out light, are they?</em></p>

                <p>And suddenly, I realised… Wait a minute.</p>

                <p>It's their nature to burn and shine. That's how they exist. That's what makes them alive.</p>

                <p>Guess, It's never a sacrifice or an effort to be what we are.</p>

                <p>(And here I am, minding the diyas' business.)</p>

                <button class="diya-next" style="margin-bottom: -5px;" onclick="showAbsurdLaw()"> Next Page</button>
            </div>

        </div>
    `;
}

function showAbsurdLaw() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content">
            <p class="page-label">ONE VERY IMPORTANT, VERY UNIMPORTANT QUESTION.</p>

            <h2>You can make one silly rule that everyone in the world must follow for 24 hours.</h2>

            <p>It can be anything you want. No consequences for you.</p>

            <h3>What would your rule be?</h3>

            <button onclick="showLawInput()">I have a rule.</button>

            <button onclick="showLawPass()">Pass the question.</button>
        </div>
    `;
}

function showLawInput() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content">
            <p class="page-label">YOUR LAW, YOUR HIGHNESS.</p>

            <h2>Alright, let's hear it.</h2>

            <textarea
                id="lawAnswer"
                placeholder="Everyone must..."
                rows="4"
            ></textarea>

            <button onclick="submitLaw()">Submit your law</button>
        </div>
    `;
}

async function submitLaw() {
    const answerBox = document.getElementById("lawAnswer");
    const answer = answerBox.value.trim();

    if (!answer) {
        alert("Your law is still a secret. Write something first!");
        return;
    }

    const formEndpoint = "https://formspree.io/f/xaeenzve";

    try {
        const response = await fetch(formEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                law: answer
            })
        });

        if (response.ok) {
            document.getElementById("firstpage").innerHTML = `
                <div class="page-content">
                    <p class="page-label">LAW RECEIVED.</p>
                    <h2>Your law has been submitted. The world has been notified.</h2>
                    <p>Well, at least this corner of it.</p>
                    <button onclick="showStoryTransition()">And now... →</button>
                </div>
            `;
        } else {
            alert("Your law couldn't be sent. Please try again.");
        }
    } catch (error) {
        alert("Something went wrong. Please check your internet connection and try again.");
    }
}

function showLawPass() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content">
            <p class="page-label">OH, REALLY?</p>

            <h2>NO LAW TODAY?</h2>

            <p>The opportunity to abuse your imaginary power was right there.</p>

            <p><em>And you chose peace.</em></p>

            <button onclick="showStoryTransition()">Moving on →</button>
        </div>
    `;
}

function showStoryTransition() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content">
            <p class="page-label">ANYWAY.</p>

            <p>People make up rules all the time.</p>

            <p>Some write them down. Some expect everyone else to follow them.</p>

            <p>And some people follow rules nobody ever told them about.</p>

            <p><em>Like the girl who always said, "It's fine."</em></p>

            <button onclick="showFineGirlStory()">Turn the page →</button>
        </div>
    `;
}

function showFineGirlStory() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content story-page" >
            <p class="page-label">A LITTLE STORY</p>

            <h3 class="story-title">The Girl Who Always Said "It's Fine"</h3>

            <p>Every time someone apologised to her, she said, "It's fine."</p>
            <p>You stepped on her foot? It's fine.</p>

            <p>You forgot her birthday? It's fine.</p>

            <p>You cancelled plans for the fourth time? It's fine.</p>

            <p>One day, a stranger accidentally bumped into her at a railway station.</p>

            <p>"Sorry!" he said.</p>

            <p>"It's fine," she replied.</p>

            <p>He walked away.</p>

            <p>She continued walking, too.</p>

            <p>Except, for some reason, she found herself thinking about him.</p>

            <p>Not because he'd bumped into her.</p>

            <p>Because he'd apologised.</p>

            <p>He hadn't known her. He hadn't owed her anything. He'd made a mistake, noticed it, and acknowledged it.</p>

            <p>And she wondered when she'd started treating those three things as something extraordinary.</p>

            <button class="diya-next" style="margin-bottom: 25px;" onclick="showFineGirlEnding()"> What happened next?</button>
        </div>
    `;
}

function showFineGirlEnding() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content story-page">
            <p class="page-label">THE NEXT MORNING</p>

            <p>That evening, her friend called.</p>

            <p>"I'm sorry, yaar. I completely forgot we were supposed to meet."</p>

            <p>She looked at the clock.</p>

            <p>She'd been waiting for an hour.</p>

            <p>"It's fine," she said.</p>

            <p>There was a pause.</p>

            <p>Then her friend asked, "Is it?"</p>

            <p>She opened her mouth.</p>

            <p>And for the first time in a very long time, she didn't know what to say.</p>

            <p>Because the strange thing about saying <em>it's fine</em> is that, eventually, people stop asking whether it is.</p>

            <p>And sometimes, you stop asking yourself, too.</p>

            <button onclick="showFineGirlFinale()">Keep reading →</button>
        </div>
    `;
}

function showFineGirlFinale() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content story-page">
            <p class="page-label">ONE TUESDAY</p>

            <p>The next morning, someone stepped on her foot at the station.</p>

            <p>"Sorry!" he said.</p>

            <p>She looked at him.</p>

            <p>"That's alright," she replied.</p>

            <p>Then she added, "But it did hurt."</p>

            <p>The man nodded. "Yeah. Sorry about that."</p>

            <p>And they both continued walking.</p>

            <p>Nothing dramatic happened.</p>

            <p>The trains didn't stop. The sky didn't change colour. Nobody clapped.</p>

            <p>But she went to work that morning feeling strangely lighter.</p>

            <p>She hadn't started a fight.</p>

            <p>She hadn't swallowed her feelings.</p>

            <p>She'd just told the truth about a foot.</p>

            <h3>And honestly, that was enough for one Tuesday.</h3>
            <button class="diya-next" style="margin-bottom: 25px;" onclick="showYouMadeMeForget()">
             Next page →
            </button>
        </div>
    `;
}

function showStoryTransition() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content">
            <p class="page-label">SOMETHING FOR YOU</p>

            <h2>As you make a law, there's a story waiting for you.</h2>

            <button onclick="showFineGirlStory()">Turn the page →</button>
        </div>
    `;
}

function showYouMadeMeForget() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content story-page forget-page">
            <p class="page-label forget-label">A THOUGHT, INTERRUPTED.</p>

            <h3 class="story-title">You Made Me Forget.</h3>

            <p>You remember something. Something AMAZING.</p>

            <p>A thought so good that you mentally congratulate yourself for having it.</p>

            <p><em>Oh, this is actually worth sharing.</em></p>

            <p>And then someone starts talking.</p>

            <p>You listen. You respond. You get involved.</p>

            <p>And suddenly...</p>

            <h3>IT'S GONE.</h3>

            <p>You stare into the void, trying to retrieve it.</p>

            <p>And somehow, you've decided this is the other person's fault.</p>

            <p><em>If you hadn't started talking, I'd have said something brilliant by now.</em></p>

            <p>Meanwhile, they're just standing there, existing.</p>

            <p><em>Perhaps the thought wasn't that important.</em></p>

            <p><em>Perhaps it was.</em></p>

            <p><em>We'll never know.</em></p>

            <h3>Anyway, what were we talking about?</h3>

            <button class="diya-next" style="margin-bottom: 25px;" onclick="showThingsWeCallThings">
                Turn the page →
            </button>
        </div>
    `;
}

function showThingsWeCallThings() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content story-page things-page">
            <p class="page-label">A LITTLE OBSERVATION.</p>

            <h3 class="story-title">The Things We Call Things</h3>

            <p>We're so quick to name things.</p>

            <p>
                A little kindness becomes sympathy.<br>
                A little distance becomes indifference.<br>
                A little silence becomes ignorance.
            </p>

            <p>
                And just like that,<br>
                we've made sense of everything.
            </p>

            <p>How convenient.</p>

            <p>
                We no longer have to wonder<br>
                what someone meant,<br>
                what someone felt,<br>
                or what we might have missed.
            </p>

            <p>We have a word for it now.</p>

            <p>
                And words are wonderful things.<br>
                They help us understand each other.
            </p>

            <button class="diya-next" style="margin-bottom: 25px;" onclick="showThingsWeCallThingsPartTwo()">
                Turn the page →
            </button>
        </div>
    `;
}

function showThingsWeCallThingsPartTwo() {
    const page = document.getElementById("firstpage");

    page.innerHTML = `
        <div class="page-content story-page things-page">
            <p class="page-label">AND THEN...</p>

            <p>
                Until we start using them<br>
                to stop understanding each other.
            </p>

            <p>
                Because sometimes,<br>
                a label is just a question<br>
                we got tired of asking.
            </p>

            <p>
                And sometimes,<br>
                the thing we thought we understood<br>
                was a person<br>
                we never really tried to.
            </p>

            <p>We gave it a name.</p>

            <p>
                And somehow, that felt<br>
                like knowing it.
            </p>
        </div>
    `;
}