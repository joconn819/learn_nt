# Sagebrush browser runtime

This directory contains the Sagebrush 0.6.1 notebook component and its browser runtime, copied from the published Sagebrush site at <https://sagebrush.space/> on 2026-10-25. The corresponding upstream project is <https://github.com/sagemathinc/sagebrush>.

Sagebrush is independently licensed under MIT or Apache-2.0; see `LICENSE-MIT` and `LICENSE-APACHE`. `THIRD-PARTY-NOTICES.txt` contains notices for the bundled dependencies. The `lib/` JSON chunks are pinned by hashes embedded in `sagebrush-worker.js`; the runtime checks them before use.

The worker and engine assets are hosted with this course so browsers can load them as same-origin resources. The Sagebrush engine still runs locally in the learner's browser; this static course does not send notebook code to a server.
