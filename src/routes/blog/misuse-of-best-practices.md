---
layout: post
title: The Misuse of Best Practices
date: 2024-09-27T00:00:00.000Z
description: When best practices aren't the best. Maybe they're simply "good", or maybe they're just the way we've always done things.
---

Languages are full of [misnomers](https://en.wikipedia.org/wiki/Misnomer) and I wholeheartedly embrace this type of evolution of language. Sometimes slang, mispronunciations, and accidents can distort language in a way that is wonderfully creative. I also generally dislike the purist attitude that nitpicks any deviation from the "way it was in the beginning".

While the evolution of languages is good -- it's never unbounded -- culture coalesces around a shared understanding of words, so some resistance to [semantic change](https://en.wikipedia.org/wiki/Semantic_change) is healthy. If semantic change progresses unbounded, we'd quickly lose the ability to communicate with each other.

So, allow me this pedantic nitpick: I'm not a fan of the term **best practices**. I think it's a misnomer that can lead to fragility.

While it is a succinct way to communicate the concept of:

> A solution that is the lesser-of-evils which is recommended in most cases.

I prefer to say "good" instead of "best", and generally be more precise with whether a practice is **good**, the **standard** way, or the **way things have always been done**.

I'm only taking issue with the _way that we communicate_. It's not inherently bad to do a thing because it has always been done that way, it's just not optimal to say that it's a best practice, especially if you don't understand why it's best.

## Learning to Cycle

The process of cognitive compression, or [chunking](<https://en.wikipedia.org/wiki/Chunking_(psychology)>), helps us to create [heuristics](https://en.wikipedia.org/wiki/Heuristic) to navigate the situations we are faced with.

For beginners or anyone who is learning the ropes of any discipline, using established heuristics allows you to act without much effort. It allows you to rehearse what the practice looks and feels like without having to learn from scratch. It can accelerate your learning, much like using stabilizers on a bicycle.

In learning and in life, we adopt heuristics that make sense at the time, and then adjust them based on experience, we get comfortable or we are surprised, and then we adjust.

The great thing about so-called best practices is that when you follow them, even without understanding them, things work _almost_ all of the time.

The issue is that it's easy to take a best practice and believe it will always be optimal in any situation. After all, it's a _best_ practice, right? It must be the _best_ way to do things.

A heuristic can be earned through experimentation and deliberate thought. But we can't earn _all_ our heuristics, and we can't take _everything_ for granted. So, a middle ground is necessary: adopt heuristics, but strive to understand why they work, why they were adopted, and their limitations.

## When Best Isn't Best

To be fair, I believe that most software engineers would agree that the term "best practices" is simply another way to say "standard practices". I Most would not be so bold as to say that any one practice is the literal "best". There's [hubris](https://en.wikipedia.org/wiki/Hubris) in saying that any one thing is best -- especially in a scientifically driven field.

Of course, there are many who profess that they know the best way. It's a great way to get people to click on your video, read your article, or buy your product. Certainty sells. However, even in seemingly clear cut situations, it can only ever be the best that we are _currently aware of_.

The historian and philosopher of science [Thomas Kuhn](https://en.wikipedia.org/wiki/Thomas_Kuhn) claimed that science progresses through a series of [paradigm shifts](https://en.wikipedia.org/wiki/Paradigm_shift) where new phenomenon conflict with prevailing theories and lead to new theories. Some examples of scientific paradigm shifts include the shifts from:

- A geocentric to a heliocentric model of the solar system.
- Newtonian physics to quantum mechanics at the atomic scale.
- Goal directed evolution to natural selection.
- [Miasma theory](https://en.wikipedia.org/wiki/Miasma_theory) to germ theory.

And so, science often progresses by questioning the status quo. It's a process of discovery and refinement.

In software there are many murky areas where a best practice is not clear. Some examples include:

- Choosing monolithic vs microservices architecture
- Following "clean code" principles vs "working code" principles
- Attending to Separation of Concerns vs Locality of Behavior
- Insistence on DRY code vs Avoiding Premature Abstraction

Yet on each side of these debates, there are proponents who claim that their way is the best way. In many cases, I'll grant that they probably know what they are talking about. But, I'd argue that they are not _best_ practices. They are the best that they are aware of for the problems they are faced with. Even then, especially when talking of overarching architectural decisions, it's hard to conceive of a decision that doesn't involve trade-offs.

---

I'm not saying that we should constantly question everything. That would be exhausting and we'd get nothing done. I'm only saying that we should make sure that our students and junior developers realize that the term "best practice" refers to a prevailing practice, not an absolute truth. We should also be open to their questions and their challenges to our practices. Often the best insights come from "stupid" questions.

I believe that **by using the term "best" we're encouraging people to adopt practices without understanding them**. This can lead to fragility in our systems and in our thinking.

I see it as a small calibration error that can accumulate over time. Because, of course, changing the way we use a common phrase doesn't solve the problem, it's just a small nudge in the "good" direction. Ultimately, if we could be aware of our inherent limitations as thinking and feeling humans, it wouldn't matter. Alas, even though we can be aware of our [cognitive biases](https://en.wikipedia.org/wiki/Cognitive_bias), it's impossible to be aware of all of them all of the time. We can build systems and institutions to help us, but we can't escape the limitations of our perceptions.

So, in the name of precision, try to say "good" instead of "best", or at least, "the best we're aware of". And try to understand why a practice is good, and when passing on good practices, try to explain why they are good.
