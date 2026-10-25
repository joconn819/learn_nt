# Number Theory Fieldnotes

A static, GitHub Pages course for computational number theory and Sagebrush. It has six chapters and 24 lessons, moving from divisibility and modular arithmetic to finite fields, RSA, quadratic fields, and class groups. Learners write their own code in an editable Sage-mode notebook at Sagebrush.space, then check their result in the course. Answer progress is saved in the browser's local storage.

## Curriculum

1. Integer structure: divisibility, Bézout's identity, prime factorization, and Euler's totient.
2. Congruences and cycles: residues, inverses, Fermat's little theorem, and the Chinese remainder theorem.
3. Primes and algorithms: primality, prime search, prime counts, and integer factorization.
4. Finite fields and groups: field arithmetic, quadratic residues, multiplicative order, and generators.
5. RSA and public-key arithmetic: key parameters, modular inverses, encryption, and decryption.
6. Quadratic fields and class groups: discriminants, ideal classes, unique factorization, and prime splitting.

## Run locally

Open `index.html` in a browser or serve the folder with any static file server. The Sagebrush notebooks open at Sagebrush.space and run in the browser.

## Publish on GitHub Pages

The `Deploy to GitHub Pages` Actions workflow publishes this folder whenever a commit reaches `main`. Enable Pages in the repository settings with **GitHub Actions** as the build source.

Sagebrush source: [sagemathinc/sagebrush](https://github.com/sagemathinc/sagebrush). Browser notebook: [sagebrush.space](https://sagebrush.space/).
