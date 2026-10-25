# Number Theory Fieldnotes

A static, GitHub Pages course for computational number theory and Sagebrush. It has seven chapters and 34 lessons, introducing prime numbers before factorization, then coprimality and modular arithmetic before Euler's totient, followed by finite fields and their unit groups, RSA, quadratic fields and class groups, and elliptic curves. Algorithm lessons now move from plain-language pseudocode to learner-written Sage, with staged hints and built-in routines available for checking results. Selected lessons also include short proof prompts. Every lesson embeds its own editable Sage-mode Sagebrush notebook in the page, so learners can compute and check their result without leaving the course. A separate-tab link is available as a fallback. Lesson notebooks and course progress are saved in this browser.

## Curriculum

1. Integer structure: divisibility, Bézout's identity, primes, prime factorization, coprimality, modular arithmetic, and Euler's totient.
2. Congruences and cycles: residues, inverses, Fermat's little theorem, and the Chinese remainder theorem.
3. Primes and algorithms: primality, prime search, prime counts, and integer factorization.
4. Finite fields and groups: field arithmetic, unit groups, quadratic residues, multiplicative order, and generators.
5. RSA and public-key arithmetic: key parameters, modular inverses, encryption, and decryption.
6. Quadratic fields and class groups: discriminants, ideal classes, unique factorization, and prime splitting.
7. Elliptic curves: finite-field curves, point counting, point addition, point order, discrete logarithms, and toy Diffie–Hellman key agreement.

## Where to continue

The main course introduces these areas but does not attempt to cover them fully. Suggested follow-on routes:

- **Elementary number theory:** quadratic residues → quadratic reciprocity → modular square roots → Pell equations → continued fractions.
- **Computational number theory and cryptography:** primality tests such as Miller–Rabin → discrete logarithms → Diffie–Hellman and ElGamal → stronger factoring methods.
- **Algebraic number theory:** norms and rings of integers → ideals and ideal factorization → class groups and units → prime splitting in more general number fields.
- **Elliptic curves:** curve arithmetic over extension fields → faster point-counting algorithms → isogenies → cryptographic implementation and security.
- **Unit groups:** units in rings of integers → roots of unity → Dirichlet's unit theorem → regulator and class group computations.

## Run locally

Open `index.html` in a browser or serve the folder with any static file server. The Sagebrush notebook component and its Web Worker, WebAssembly engine, and library chunks are vendored under `vendor/sagebrush/` so GitHub Pages can serve the worker from the course's origin. All code executes in the learner's browser. The vendored Sagebrush 0.6.1 files are under MIT or Apache-2.0; their licenses and third-party notices are in `vendor/sagebrush/`.

## Publish on GitHub Pages

The `Deploy to GitHub Pages` Actions workflow publishes this folder whenever a commit reaches `main`. Enable Pages in the repository settings with **GitHub Actions** as the build source.

Sagebrush source: [sagemathinc/sagebrush](https://github.com/sagemathinc/sagebrush). Browser notebook: [sagebrush.space](https://sagebrush.space/).
