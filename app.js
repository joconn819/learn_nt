const chapters = [
  {
    id: "integer-arithmetic", title: "Integer structure", short: "Integers",
    overview: "Build the vocabulary of number theory: divisibility, gcds, prime factorization, coprimality, and arithmetic modulo n.",
    goals: "By the end, use the Euclidean algorithm, factor integers, test whether numbers are coprime, calculate with remainders, and then use Euler's totient."
  },
  {
    id: "congruences", title: "Congruences & cycles", short: "Congruences",
    overview: "Replace exact equality with equality up to a modulus. Remainders turn arithmetic into a study of periodic patterns.",
    goals: "Work with residue classes, modular powers, inverses, Fermat's theorem, and simultaneous congruences."
  },
  {
    id: "primes", title: "Primes & algorithms", short: "Primes",
    overview: "Primes are both the atoms of the integers and objects we must find, test, and factor computationally.",
    goals: "Use primality tests and prime searches, count primes in a range, and factor a large composite."
  },
  {
    id: "finite-fields", title: "Finite fields & groups", short: "Finite fields",
    overview: "Arithmetic modulo a prime forms a finite field. Its nonzero elements make a cyclic group, linking equations to structure.",
    goals: "Compute in a finite field, identify quadratic residues, measure multiplicative order, and find generators."
  },
  {
    id: "rsa", title: "RSA & public-key arithmetic", short: "RSA",
    overview: "RSA turns modular arithmetic into a public-key system. Its correctness follows from the theorems in the previous chapters.",
    goals: "Construct toy RSA parameters, find the private exponent, encrypt and decrypt, then see why factoring matters."
  },
  {
    id: "quadratic-fields", title: "Quadratic fields & class groups", short: "Number fields",
    overview: "Move from integers to numbers such as √−5. Algebraic integers have their own discriminants, primes, and factorization behavior.",
    goals: "Construct quadratic fields, compute discriminants and class numbers, and inspect how a rational prime splits."
  }
];

const lessons = [
  // Chapter 1 · Integer structure
  {
    id: "gcd", chapter: 0, title: "Find a greatest common divisor", topic: "DIVISIBILITY", time: "5 MIN",
    lede: "Number theory starts with divisibility. The greatest common divisor is the largest integer that divides both inputs.",
    question: "Find <span class=\"math\">gcd(252, 198)</span>. Then check that your answer divides both numbers.",
    idea: "The Euclidean algorithm replaces a pair (a, b) with (b, a mod b). The gcd stays the same while the remainders shrink.",
    starter: "# Start with the two integers\na, b = 252, 198\n\n# Use Sage to find their gcd, then verify divisibility\n",
    hint: "Try <code>gcd(a, b)</code>. To see the Euclidean algorithm at work, inspect <code>a % b</code>, then repeat with the smaller pair.",
    answer: ["18"], placeholder: "gcd(252, 198) = ?",
    success: "Correct: 18 divides both 252 and 198, and no larger positive integer does.",
    concept: "Divisibility gives us a way to compare integers before we factor them."
  },
  {
    id: "bezout", chapter: 0, title: "Recover Bézout coefficients", topic: "EUCLIDEAN ALGORITHM", time: "6 MIN",
    lede: "The extended Euclidean algorithm does more than find a gcd: it writes the gcd as an integer combination of its inputs.",
    question: "Find an integer <span class=\"math\">u</span> such that <span class=\"math\">252u + 198v = 18</span> for some integer <span class=\"math\">v</span>. What is the coefficient Sage returns for 252?",
    idea: "Bézout's identity says gcd(a,b) = au + bv. The returned coefficients prove the gcd and later give modular inverses.",
    starter: "# Look for integers u and v with 252*u + 198*v = gcd(252, 198)\na, b = 252, 198\n\n# Find and check a Bézout identity\n",
    hint: "Run <code>xgcd(a, b)</code>. Sage returns (g, u, v), then verify <code>a*u + b*v == g</code>.",
    answer: ["4"], placeholder: "coefficient u = ?",
    success: "Yes. One identity is 252·4 + 198·(−5) = 18.",
    concept: "The same algorithm that proves a gcd will later make division modulo n possible."
  },
  {
    id: "factor-small", chapter: 0, title: "Split an integer into primes", topic: "FUNDAMENTAL THEOREM OF ARITHMETIC", time: "5 MIN",
    lede: "Every integer greater than 1 has exactly one prime factorization, apart from the order of its factors.",
    question: "Find the prime factorization of <span class=\"math\">8051</span>. Which two primes multiply to make it?",
    idea: "A factorization records each prime and its exponent. This compact description is the basic data behind many arithmetic functions.",
    starter: "# Find prime factors of n, and check that their product is n\nn = 8051\n\n",
    hint: "Try <code>factor(n)</code>. The answer is a product of prime powers; multiply the factors back together as a check.",
    answer: ["83*97", "83 97", "83,97", "97*83", "97 83", "97,83"], placeholder: "prime factors of 8051",
    success: "Exactly: 8051 = 83 × 97, with both factors prime.",
    concept: "Prime factorization is the integer analogue of writing a polynomial as a product of irreducibles."
  },
  {
    id: "coprime", chapter: 0, title: "Decide when two integers are coprime", topic: "COPRIMALITY", time: "5 MIN",
    lede: "Two integers can both be composite and still have no common factor. Their gcd gives a simple test for coprimality.",
    question: "Are <span class=\"math\">35</span> and <span class=\"math\">64</span> coprime? Compute their gcd and enter it; a gcd of 1 means yes.",
    idea: "The prime factors are 35 = 5·7 and 64 = 2⁶, so they share no prime factor. Coprimality is about shared factors, not whether each number is prime.",
    starter: "# Check whether 35 and 64 have any common factor\na, b = 35, 64\ng = gcd(a, b)\n\n# The final expression is displayed as the notebook output\ng",
    hint: "Run <code>gcd(a, b)</code>. If it returns 1, no integer greater than 1 divides both inputs.",
    answer: ["1"], placeholder: "gcd(35, 64) = ?",
    success: "Correct: the gcd is 1, so 35 and 64 are coprime. Neither number needs to be prime.",
    concept: "Coprimality tells us when a number can be divided by modulo n."
  },
  {
    id: "modular-arithmetic", chapter: 0, title: "Do arithmetic modulo n", topic: "MODULAR ARITHMETIC", time: "6 MIN",
    lede: "In modular arithmetic, we keep only the remainder after division by a fixed positive integer called the modulus.",
    question: "Compute <span class=\"math\">(17 + 9)·5 modulo 7</span>. Reduce the values as you go and enter the final remainder.",
    idea: "Modulo 7, 17 has remainder 3 and 9 has remainder 2. So (17+9)·5 has the same remainder as (3+2)·5 = 25, which is 4 modulo 7.",
    starter: "# Sage will reduce each value modulo 7 as you calculate\na = Mod(17, 7)\nb = Mod(9, 7)\nresult = (a + b) * 5\n\n# Display the resulting residue\nresult",
    hint: "Use <code>Mod(value, modulus)</code> to create a residue class. Sage reduces sums and products automatically; with plain integers, <code>value % modulus</code> gives the remainder.",
    answer: ["4"], placeholder: "remainder = ?",
    success: "Yes: 26·5 = 130, and 130 = 18·7 + 4, so the remainder is 4.",
    concept: "This is the basic arithmetic behind the congruences and modular powers in Chapter 2."
  },
  {
    id: "totient", chapter: 0, title: "Count the coprime residues", topic: "ARITHMETIC FUNCTIONS", time: "6 MIN",
    lede: "Euler's totient φ(n) counts the integers from 1 through n that are coprime to n.",
    question: "How many residues <span class=\"math\">a</span> modulo <span class=\"math\">360</span> have <span class=\"math\">gcd(a, 360) = 1</span>?",
    idea: "If n = ∏ pᵉ, then φ(n) = ∏ pᵉ⁻¹(p−1). Prime factorization turns the count into a product.",
    starter: "# Factor 360, then count the residues coprime to it\nn = 360\n\n",
    hint: "Compare a direct count with Sage's <code>euler_phi(n)</code>. What does the prime factorization tell you about the formula?",
    answer: ["96"], placeholder: "φ(360) = ?",
    success: "Right: φ(360) = 96. Exactly 96 residue classes have multiplicative inverses modulo 360.",
    concept: "The totient counts exactly the residue classes modulo n that have a multiplicative inverse."
  },

  // Chapter 2 · Congruences
  {
    id: "remainders", chapter: 1, title: "Compute with remainders", topic: "RESIDUE CLASSES", time: "5 MIN",
    lede: "Two integers are congruent modulo m when they have the same remainder after division by m.",
    question: "Find the remainder when <span class=\"math\">37¹⁰⁰</span> is divided by <span class=\"math\">101</span>.",
    idea: "There are only 101 possible remainders modulo 101. Repeated multiplication must eventually cycle, so a huge power can have a small answer.",
    starter: "# Compute the remainder without constructing the huge power\na, exponent, modulus = 37, 100, 101\n\n",
    hint: "Use <code>power_mod(a, exponent, modulus)</code>. Compare it with <code> (a^exponent) % modulus</code> for this small example.",
    answer: ["1"], placeholder: "remainder = ?",
    success: "Correct: the remainder is 1. In fact, 101 is prime and 37 is nonzero modulo 101, so Fermat's theorem predicts this.",
    concept: "Congruence lets us replace an enormous integer with a small residue without losing the modular result."
  },
  {
    id: "inverse", chapter: 1, title: "Undo multiplication modulo n", topic: "MODULAR INVERSES", time: "6 MIN",
    lede: "An inverse of a modulo n is a number u with au congruent to 1. It is the modular version of division.",
    question: "Find the inverse of <span class=\"math\">17 modulo 3120</span>: find <span class=\"math\">u</span> with <span class=\"math\">17u ≡ 1 (mod 3120)</span>.",
    idea: "An inverse exists exactly when gcd(a,n)=1. Bézout's identity supplies the coefficient u in au + nv = 1.",
    starter: "# Find u such that 17*u differs from 1 by a multiple of 3120\na, n = 17, 3120\n\n# Check the gcd before looking for an inverse\n",
    hint: "Try <code>inverse_mod(a, n)</code>, then verify <code>(a*u) % n</code> is 1.",
    answer: ["2753"], placeholder: "inverse = ?",
    success: "Exactly: 17 × 2753 = 46801 = 1 + 15 × 3120.",
    concept: "The inverse exists because 17 and 3120 are coprime. This is the key operation in RSA."
  },
  {
    id: "fermat", chapter: 1, title: "See Fermat's little theorem", topic: "FERMAT'S THEOREM", time: "6 MIN",
    lede: "A prime modulus forces a striking pattern in powers: every nonzero residue raised to p−1 is 1 modulo p.",
    question: "Compute <span class=\"math\">3¹⁶ mod 17</span>. What value does Fermat's little theorem predict before you run the code?",
    idea: "For prime p and p not dividing a, aᵖ⁻¹ ≡ 1 (mod p). This is a theorem about the multiplicative group of nonzero residues.",
    starter: "# Check the hypotheses, then compute the modular power\na, p = 3, 17\n\n",
    hint: "Use <code>is_prime(p)</code> and <code>power_mod(a, p-1, p)</code>.",
    answer: ["1"], placeholder: "3^16 modulo 17 = ?",
    success: "Yes: 1. The theorem applies because 17 is prime and 17 does not divide 3.",
    concept: "The theorem follows from Lagrange's theorem applied to the nonzero residues modulo p."
  },
  {
    id: "crt", chapter: 1, title: "Reconcile two repeating clocks", topic: "CHINESE REMAINDER THEOREM", time: "6 MIN",
    lede: "A congruence describes a repeating schedule. The Chinese remainder theorem finds when two schedules coincide.",
    question: "Find the least positive <span class=\"math\">x</span> with <span class=\"math\">x ≡ 2 (mod 9)</span> and <span class=\"math\">x ≡ 3 (mod 8)</span>.",
    idea: "Since 8 and 9 are coprime, there is one solution modulo 72. Check a candidate by reducing it modulo each clock's period.",
    starter: "# Find a number in both residue classes\na, m = 2, 9\nb, n = 3, 8\n\n# Check your result against both congruences\n",
    hint: "Try <code>crt(a, b, m, n)</code>. Sage returns a representative of the shared residue class.",
    answer: ["11", "11mod72", "11(mod72)"], placeholder: "least positive x",
    success: "Correct: 11 leaves remainders 2 and 3. All solutions are 11 modulo 72.",
    concept: "The coprime moduli make the combined period the product 9·8 = 72."
  },

  // Chapter 3 · Primes
  {
    id: "primality", chapter: 2, title: "Test a prime candidate", topic: "PRIMALITY", time: "5 MIN",
    lede: "A prime has no positive divisors other than 1 and itself. For large inputs, testing that property is an algorithmic problem.",
    question: "Is <span class=\"math\">104729</span> prime? Use Sagebrush to decide, then explain how you could independently check the result for a number this small.",
    idea: "A trial-division check needs only primes up to √n. Software can use faster methods for much larger integers.",
    starter: "# Test whether n is prime\nn = 104729\n\n",
    hint: "Run <code>is_prime(n)</code>. For a manual check, it is enough to test prime divisors up to floor(√n).",
    answer: ["true", "yes", "prime"], placeholder: "is it prime?",
    success: "Yes. Sagebrush reports that 104729 is prime.",
    concept: "A computational answer is more useful when you know what kind of test supports it."
  },
  {
    id: "prime-search", chapter: 2, title: "Search for the next prime", topic: "PRIME DISTRIBUTION", time: "5 MIN",
    lede: "Primes become less frequent as numbers grow, but there is always another prime after any given bound.",
    question: "What is the smallest prime greater than one million?",
    idea: "A prime search tests successive candidates. The Prime Number Theorem predicts that near x, a typical gap is about log(x), but it does not predict each gap exactly.",
    starter: "# Start just above the given bound\nbound = 1_000_000\n\n# Find and verify the next prime\n",
    hint: "Try <code>next_prime(bound)</code>, then check <code>is_prime</code> and the previous candidate.",
    answer: ["1000003", "1,000,003"], placeholder: "next prime = ?",
    success: "Correct: 1,000,003 is prime, and there is no prime between it and 1,000,000.",
    concept: "Search is simple to describe; choosing a reliable primality test makes it practical."
  },
  {
    id: "prime-count", chapter: 2, title: "Count primes in a range", topic: "PRIME DISTRIBUTION", time: "5 MIN",
    lede: "The prime-counting function π(x) counts primes up to x. Small experiments help build intuition about how primes thin out.",
    question: "How many primes are less than 100? Generate the list in Sagebrush and count its entries.",
    idea: "A finite computation can reveal a pattern, but a proof must explain why it continues beyond the values we checked.",
    starter: "# Generate primes below 100 and count them\nbound = 100\n\n",
    hint: "Use <code>prime_range(bound)</code>, then apply <code>len(...)</code>.",
    answer: ["25"], placeholder: "π(100) = ?",
    success: "Yes: there are 25 primes below 100.",
    concept: "Computation suggests patterns; proof tells us which patterns must persist."
  },
  {
    id: "large-factor", chapter: 2, title: "Factor a composite at scale", topic: "INTEGER FACTORIZATION", time: "6 MIN",
    lede: "Factoring becomes difficult as the input grows. This asymmetry is useful in cryptography and a challenge in computational number theory.",
    question: "Factor <span class=\"math\">600851475143</span>. What is its largest prime factor?",
    idea: "The factorization is unique, but finding it is not known to have a fast classical algorithm for arbitrary large inputs.",
    starter: "# Let Sagebrush search for the prime factors\nn = 600851475143\n\n# Verify that the factors multiply back to n\n",
    hint: "Run <code>factor(n)</code>, then inspect the largest prime in the result.",
    answer: ["6857"], placeholder: "largest prime factor = ?",
    success: "Right: the factorization is 71 × 839 × 1471 × 6857.",
    concept: "The time needed to factor is central to the security assumptions behind RSA."
  },

  // Chapter 4 · Finite fields and groups
  {
    id: "finite-field", chapter: 3, title: "Compute inside a finite field", topic: "FINITE FIELDS", time: "6 MIN",
    lede: "Integers modulo a prime p form a field: every nonzero element has a multiplicative inverse.",
    question: "In the field <span class=\"math\">𝔽₇</span>, compute <span class=\"math\">3⁶</span>. What is the result?",
    idea: "The field has six nonzero elements. Lagrange's theorem implies every nonzero element raised to the group order, 6, is 1.",
    starter: "# Construct the field with seven elements\nF = GF(7)\na = F(3)\n\n# Compute a power and inspect the result\n",
    hint: "Evaluate <code>a^6</code>. Also try <code>F(3) * F(5)</code> and compare with ordinary integer multiplication.",
    answer: ["1"], placeholder: "3^6 in GF(7) = ?",
    success: "Correct: 1. The six nonzero elements form a group of order 6.",
    concept: "Finite fields make arithmetic cyclic and predictable, which is why they appear in coding and cryptography."
  },
  {
    id: "quadratic-residues", chapter: 3, title: "Recognize a quadratic residue", topic: "QUADRATIC RESIDUES", time: "6 MIN",
    lede: "A nonzero residue modulo p is a square if it equals x² for some x. Quadratic residues reveal structure in the field.",
    question: "Is <span class=\"math\">5</span> a square modulo <span class=\"math\">23</span>? Use the Legendre symbol to report +1 or −1.",
    idea: "Euler's criterion says a^((p−1)/2) is 1 for a square and −1 for a nonsquare, when p is an odd prime and p does not divide a.",
    starter: "# Inspect the nonzero squares in F_23, or use Euler's criterion\na, p = 5, 23\n\n",
    hint: "Try <code>legendre_symbol(a, p)</code>. A result of 1 means square; −1 means nonsquare.",
    answer: ["-1", "−1", "nonsquare", "non-square"], placeholder: "Legendre symbol = ?",
    success: "Correct: the symbol is −1, so 5 is not a square modulo 23.",
    concept: "The Legendre symbol compresses a yes/no question about squares into a useful multiplicative function."
  },
  {
    id: "multiplicative-order", chapter: 3, title: "Measure a multiplicative cycle", topic: "GROUPS MODULO p", time: "6 MIN",
    lede: "Repeatedly multiply a nonzero residue by itself. Its multiplicative order is the first exponent that returns to 1.",
    question: "What is the multiplicative order of <span class=\"math\">2 modulo 13</span>?",
    idea: "The order must divide the group size φ(13) = 12. It records the length of the cycle generated by 2.",
    starter: "# Create 2 as a residue modulo 13\na = Mod(2, 13)\n\n# Find the first positive exponent that gives 1\n",
    hint: "Ask Sagebrush for <code>a.multiplicative_order()</code>. You can also list powers until the first 1 appears.",
    answer: ["12"], placeholder: "order = ?",
    success: "Yes: the order is 12, so 2 generates every nonzero residue modulo 13.",
    concept: "Elements whose order is p−1 are generators of the multiplicative group."
  },
  {
    id: "primitive-root", chapter: 3, title: "Find a generator modulo a prime", topic: "CYCLIC GROUPS", time: "6 MIN",
    lede: "For prime p, the nonzero residues modulo p form a cyclic group. A generator visits every nonzero residue as its powers.",
    question: "Find a primitive root modulo <span class=\"math\">23</span>. Report the smallest positive one.",
    idea: "A generator has order p−1. To test a candidate, its powers must not return to 1 at any proper divisor of p−1.",
    starter: "# Search for a generator in the nonzero residues modulo 23\np = 23\n\n# Find the smallest primitive root and verify its order\n",
    hint: "Try <code>primitive_root(p)</code>, then check the candidate's multiplicative order modulo p.",
    answer: ["5"], placeholder: "smallest primitive root = ?",
    success: "Correct: 5 has order 22 modulo 23, so its powers run through every nonzero residue.",
    concept: "Generators turn a multiplicative group into a sequence of powers, a useful model for discrete logarithms."
  },

  // Chapter 5 · RSA
  {
    id: "rsa-parameters", chapter: 4, title: "Build toy RSA parameters", topic: "RSA · KEY GENERATION", time: "7 MIN",
    lede: "RSA starts with two primes. Their product is public; the totient of that product helps construct the private key.",
    question: "For <span class=\"math\">p = 61</span> and <span class=\"math\">q = 53</span>, find the pair <span class=\"math\">(n, φ(n))</span>, where <span class=\"math\">n = pq</span>.",
    idea: "For distinct primes p and q, φ(pq) = (p−1)(q−1). The totient is secret in real RSA because it is easy to compute from p and q but hard to recover from n alone.",
    starter: "# Choose the two primes and compute n and its totient\np, q = 61, 53\nn = p * q\n\n",
    hint: "Calculate <code>n = p*q</code> and <code>euler_phi(n)</code>. You can also use (p−1)*(q−1).",
    answer: ["3233,3120", "3233 3120", "(3233,3120)", "(3233, 3120)"], placeholder: "n, φ(n) = ?",
    success: "Exactly: n = 3233 and φ(n) = 3120.",
    concept: "These toy primes are far too small for security; they make the arithmetic easy to inspect."
  },
  {
    id: "rsa-private", chapter: 4, title: "Find the private exponent", topic: "RSA · MODULAR INVERSE", time: "6 MIN",
    lede: "Choose a public exponent e coprime to φ(n). The private exponent d is its inverse modulo φ(n).",
    question: "With <span class=\"math\">e = 17</span> and <span class=\"math\">φ(n) = 3120</span>, find the private exponent <span class=\"math\">d</span>.",
    idea: "The defining equation is ed ≡ 1 (mod φ(n)). This is exactly the modular inverse problem from Chapter 2.",
    starter: "# Compute d for the toy RSA key\ne, phi_n = 17, 3120\n\n# Verify that e*d is 1 modulo phi_n\n",
    hint: "Use <code>inverse_mod(e, phi_n)</code>. Check the product modulo φ(n).",
    answer: ["2753"], placeholder: "private exponent d = ?",
    success: "Right: d = 2753 and 17·2753 is 1 modulo 3120.",
    concept: "The extended Euclidean algorithm converts the key condition into an actual private exponent."
  },
  {
    id: "rsa-encrypt", chapter: 4, title: "Encrypt a message", topic: "RSA · ENCRYPTION", time: "6 MIN",
    lede: "An RSA message is an integer m between 0 and n. Encryption raises it to the public exponent modulo n.",
    question: "Encrypt <span class=\"math\">m = 65</span> using <span class=\"math\">e = 17</span> and <span class=\"math\">n = 3233</span>. What ciphertext c do you get?",
    idea: "The calculation is c = mᵉ mod n. Modular exponentiation computes it efficiently without constructing the enormous power.",
    starter: "# Compute c = m^e modulo n\nm, e, n = 65, 17, 3233\n\n",
    hint: "Use <code>power_mod(m, e, n)</code>.",
    answer: ["2790"], placeholder: "ciphertext c = ?",
    success: "Correct: the ciphertext is 2790.",
    concept: "The public operation is easy to compute; reversing it without the private key is designed to be difficult."
  },
  {
    id: "rsa-decrypt", chapter: 4, title: "Decrypt and explain why it works", topic: "RSA · DECRYPTION", time: "7 MIN",
    lede: "Decryption raises the ciphertext to d modulo n. Euler's theorem explains why this recovers the message.",
    question: "Decrypt <span class=\"math\">c = 2790</span> with <span class=\"math\">d = 2753</span> and <span class=\"math\">n = 3233</span>. What message returns?",
    idea: "Since ed = 1 + kφ(n), decryption raises m to 1 + kφ(n). Euler's theorem makes the extra factor disappear for messages coprime to n.",
    starter: "# Recover the original message\nc, d, n = 2790, 2753, 3233\n\n# Check your result against the original message\n",
    hint: "Use <code>power_mod(c, d, n)</code>. Then revisit the equation ed = 1 + kφ(n).",
    answer: ["65"], placeholder: "decrypted message = ?",
    success: "Yes: RSA returns 65. The exponent relation and Euler's theorem explain the round trip for this message.",
    concept: "RSA connects modular inverses, totients, and exponentiation into one protocol."
  },

  // Chapter 6 · Quadratic fields
  {
    id: "quadratic-field", chapter: 5, title: "Construct a quadratic field", topic: "NUMBER FIELDS", time: "6 MIN",
    lede: "A number field extends the rational numbers by adjoining an algebraic number. A quadratic field has the form ℚ(√d).",
    question: "Construct <span class=\"math\">K = ℚ(√−23)</span>. What is its field discriminant?",
    idea: "The discriminant is an integer invariant that records arithmetic information, including how rational primes can split in the field.",
    starter: "# Construct the field Q(sqrt(-23))\nK = QuadraticField(-23)\n\n# Inspect its discriminant\n",
    hint: "Run <code>K.discriminant()</code>. For a squarefree d, the quadratic field discriminant is d when d ≡ 1 mod 4, and 4d otherwise.",
    answer: ["-23", "−23"], placeholder: "discriminant = ?",
    success: "Correct: the discriminant is −23 because −23 is congruent to 1 modulo 4.",
    concept: "Discriminants are the arithmetic fingerprint used to study primes and ideal classes."
  },
  {
    id: "class-number", chapter: 5, title: "Count ideal classes", topic: "CLASS GROUPS", time: "7 MIN",
    lede: "In some number fields, elements do not factor uniquely into irreducibles. Ideals still factor uniquely; the class group measures the gap.",
    question: "What is the class number of <span class=\"math\">ℚ(√−23)</span>?",
    idea: "The class number h is the size of the ideal class group. h = 1 is equivalent to unique factorization of elements in the ring of integers.",
    starter: "# Build the field and investigate its ideal class group\nK = QuadraticField(-23)\n\n",
    hint: "Try <code>K.class_number()</code> and <code>K.class_group()</code>. Sagebrush reports whether the class-group computation is certified.",
    answer: ["3"], placeholder: "class number h = ?",
    success: "Right: h = 3. There are three ideal classes, so unique factorization of elements fails in this ring.",
    concept: "The class group turns a failure of unique factorization into a finite group we can compute."
  },
  {
    id: "compare-classes", chapter: 5, title: "Compare two class numbers", topic: "UNIQUE FACTORIZATION", time: "6 MIN",
    lede: "Different quadratic fields can have different amounts of factorization failure. Compare ℚ(√−5) and ℚ(√−23).",
    question: "What is the class number of <span class=\"math\">ℚ(√−5)</span>? Use it to decide whether this field has unique factorization of elements.",
    idea: "A class number greater than 1 signals that some ideals are not principal. This is the obstruction to unique element factorization.",
    starter: "# Compare the class groups of two imaginary quadratic fields\nK = QuadraticField(-5)\nL = QuadraticField(-23)\n\n",
    hint: "Evaluate <code>K.class_number()</code> and <code>L.class_number()</code>. Then use the criterion h = 1 for unique factorization.",
    answer: ["2"], placeholder: "h(Q(sqrt(-5))) = ?",
    success: "Correct: its class number is 2, so ℚ(√−5) does not have unique factorization of elements.",
    concept: "Class numbers distinguish fields that can look similar from the perspective of their defining equations."
  },
  {
    id: "prime-splitting", chapter: 5, title: "Watch a prime split in a field", topic: "PRIME DECOMPOSITION", time: "7 MIN",
    lede: "A rational prime may split into several prime ideals after we move to a number field.",
    question: "In <span class=\"math\">K = ℚ(√−23)</span>, how many prime ideals lie above 2?",
    idea: "The behavior of a prime is reflected by the field discriminant and a polynomial modulo p. A split prime gives two prime ideals in a quadratic field.",
    starter: "# Ask the field to factor the prime ideal generated by 2\nK = QuadraticField(-23)\n\n# Count the prime ideals above 2\n",
    hint: "Use <code>K.primes_above(2)</code>, then count the result with <code>len(...)</code>.",
    answer: ["2", "two"], placeholder: "number of prime ideals = ?",
    success: "Yes: 2 splits into two prime ideals in ℚ(√−23).",
    concept: "Prime splitting is one of the central links between field theory and arithmetic."
  }
];

// Each lesson after the introductory gcd lesson names its new mathematics
// explicitly and documents the Sage/Python tools used in its notebook.
const lessonSupport = {
  gcd: {
    definitions: [
      ["Divides", "An integer d divides n if n = d*k for some integer k. We write d | n; for example, 18 | 252 because 252 = 18*14."],
      ["Greatest common divisor gcd(a,b)", "The largest positive integer that divides both a and b. It is the greatest shared factor; gcd(252,198)=18."],
      ["Remainder", "The value left after integer division. For example, 252 % 198 = 54. The Euclidean algorithm repeatedly replaces (a,b) by (b, a % b)."]
    ],
    tools: [
      ["gcd(a, b)", "Sage's greatest-common-divisor function. It returns the largest positive integer dividing both inputs; for gcd(252,198), it returns 18."],
      ["a % b", "The remainder operator. It returns the remainder after dividing a by b; the Euclidean algorithm uses this to make smaller inputs."],
      ["a % g == 0", "A divisibility check: it returns True if the remainder is zero, meaning g divides a. In Sage, == compares values."]
    ],
    visual: {
      title: "Euclidean algorithm: each remainder gets smaller",
      caption: "The divisions end at remainder 0; the last nonzero remainder, 18, is the gcd.",
      svg: `<svg viewBox="0 0 560 110" role="img" aria-label="Euclidean algorithm steps ending with gcd 18"><g font-family="monospace" font-size="11" fill="#435448"><rect x="8" y="20" width="118" height="58" rx="7" fill="#eef3eb" stroke="#d5e0d3"/><rect x="148" y="20" width="118" height="58" rx="7" fill="#eef3eb" stroke="#d5e0d3"/><rect x="288" y="20" width="118" height="58" rx="7" fill="#eef3eb" stroke="#d5e0d3"/><rect x="428" y="20" width="118" height="58" rx="7" fill="#e5f0e3" stroke="#b9d0bc"/><text x="67" y="43" text-anchor="middle">252 = 1·198</text><text x="67" y="62" text-anchor="middle">+ 54</text><text x="207" y="43" text-anchor="middle">198 = 3·54</text><text x="207" y="62" text-anchor="middle">+ 36</text><text x="347" y="43" text-anchor="middle">54 = 1·36</text><text x="347" y="62" text-anchor="middle">+ 18</text><text x="487" y="43" text-anchor="middle">36 = 2·18</text><text x="487" y="62" text-anchor="middle">+ 0</text></g><path d="M128 49h16m-5-5 5 5-5 5M268 49h16m-5-5 5 5-5 5M408 49h16m-5-5 5 5-5 5" fill="none" stroke="#829384" stroke-width="1.5"/><text x="280" y="101" text-anchor="middle" fill="#285b43" font-family="monospace" font-size="11">last nonzero remainder = gcd(252, 198) = 18</text></svg>`,
      source: "a, b = 252, 198\nwhile b != 0:\n    a, b = b, a % b\nprint(a)  # 18"
    }
  },
  bezout: {
    definitions: [
      ["Bézout's identity", "For integers a and b, there are integers u and v such that au + bv = gcd(a,b). This equation is a certificate: it proves that the gcd can be built from the original inputs."],
      ["Bézout coefficients", "The integers u and v in that equation are called Bézout coefficients. They can be negative; their job is to make the equality exact."],
      ["Extended Euclidean algorithm", "A version of the Euclidean algorithm that finds both the gcd and Bézout coefficients." ]
    ],
    tools: [
      ["xgcd(a, b)", "Sage's extended gcd function. It returns a triple (g, u, v) with g = gcd(a,b) and a*u + b*v == g. Here xgcd(252,198) returns (18, 4, -5)."],
      ["== and *", "In Sage/Python, == compares two values and returns True or False; * multiplies. The expression a*u + b*v == g checks the certificate."]
    ]
  },
  "factor-small": {
    definitions: [
      ["Prime", "A positive integer greater than 1 whose only positive divisors are 1 and itself."],
      ["Prime factorization", "Writing an integer as a product of primes, with each prime appearing the number of times indicated by its exponent. For example, 12 = 2^2 * 3."],
      ["Exponent", "In p^e, the exponent e says how many copies of p occur in the product."],
      ["Fundamental Theorem of Arithmetic", "Every integer greater than 1 has a prime factorization, and that factorization is unique apart from reordering the factors."]
    ],
    tools: [
      ["factor(n)", "Returns Sage's prime factorization of n as prime/exponent pairs. For example, factor(12) displays 2^2 * 3; the factors are certified prime for these inputs."],
      ["prod(p^e for p,e in factor(n))", "A Sage/Python product expression that multiplies each prime p to its exponent e. It reconstructs n, so it is a useful check. Sage uses ^ for exponentiation; in ordinary Python use ** instead."]
    ]
  },
  coprime: {
    definitions: [
      ["Common divisor", "An integer that divides both numbers. For 35 and 64, the only positive common divisor is 1."],
      ["Coprime (relatively prime)", "Two integers are coprime when their greatest common divisor is 1. This does not mean that either integer must itself be prime."],
      ["Prime factors", "The prime numbers in an integer's prime factorization. If two numbers share a divisor greater than 1, they share at least one prime factor."]
    ],
    tools: [
      ["gcd(a, b)", "Sage's greatest-common-divisor function. It returns the largest positive integer dividing both a and b; gcd(35,64) returns 1."],
      ["g == 1", "A comparison that returns True when the gcd equals 1 and False otherwise. This is the direct coprimality test."],
      ["Final expression in a cell", "Sagebrush displays the value of the last expression in a code cell. Writing g on the final line shows the gcd you assigned above."]
    ]
  },
  "modular-arithmetic": {
    definitions: [
      ["Modulus", "The positive integer n that determines which remainders we keep. Here the modulus is 7."],
      ["Remainder / residue", "The value left after division by n, chosen from 0 through n-1. For example, 17 has remainder 3 modulo 7."],
      ["Modular arithmetic", "Arithmetic on residue classes, where numbers that differ by a multiple of n are treated as equal. Addition and multiplication can be done on remainders and reduced after each operation."],
      ["Congruence", "a ≡ b (mod n) means n divides a-b, or equivalently a and b have the same remainder after division by n."]
    ],
    tools: [
      ["Mod(value, n)", "Creates Sage's residue class of value modulo n. For example, Mod(17,7) represents the same modular value as 3; sums and products remain reduced modulo 7."],
      ["%", "For ordinary integers, a % n returns the remainder of a divided by n. For example, 17 % 7 returns 3."],
      ["+, *", "Addition and multiplication. When the inputs are Sage Mod objects, these operations automatically return the result modulo the chosen modulus."],
      ["Sage mode power syntax", "This lesson only needs + and *. In Sage mode, ^ is exponentiation; ordinary Python uses **. The notebook is running Sage mode."]
    ]
  },
  totient: {
    definitions: [
      ["Coprime", "Two integers are coprime (or relatively prime) when their greatest common divisor is 1."],
      ["Residue class modulo n", "All integers that have the same remainder after division by n. For instance, 1, 361, and -359 are in the same class modulo 360."],
      ["Euler's totient φ(n)", "The number of residue classes modulo n that have a multiplicative inverse. Equivalently, it counts integers from 1 through n that are coprime to n."]
    ],
    tools: [
      ["euler_phi(n)", "Returns Euler's totient φ(n). For n = 360 it returns 96."],
      ["factor(n)", "Returns the prime/exponent pairs in the factorization. The formula φ(n) = product over p^e dividing n of p^(e-1)*(p-1) uses these pairs."],
      ["gcd(a, b)", "Returns the greatest common divisor of a and b. gcd(a, n) == 1 is the test that a is coprime to n."]
    ]
  },
  remainders: {
    definitions: [
      ["Congruence", "The notation a ≡ b (mod m) means m divides a-b; equivalently, a and b leave the same remainder on division by m."],
      ["Modulus", "The positive integer m that sets which differences count as equal in a congruence."],
      ["Residue", "A chosen representative, usually from 0 through m-1, of a congruence class."],
      ["Modular exponentiation", "Computing a^e modulo m while reducing intermediate values, so the calculation stays small even when a^e is enormous."]
    ],
    tools: [
      ["power_mod(a, e, m)", "Returns a^e modulo m without constructing the full power. Arguments are base, exponent, modulus, in that order."],
      ["a % m", "The % operator returns the remainder after integer division. Thus 37^100 % 101 is the remainder, though power_mod is more efficient for large exponents."],
      ["^", "In Sage code, ^ means exponentiation. In plain Python, use **. The Sagebrush notebook is in Sage mode."]
    ],
    visual: {
      title: "A modular power stays among 101 residues",
      caption: "All powers reduce to one of 0–100. The highlighted final result is 1.",
      svg: `<svg viewBox="0 0 560 88" role="img" aria-label="Remainder scale from 0 to 100 with remainder 1 highlighted"><line x1="28" y1="45" x2="532" y2="45" stroke="#9aa99b" stroke-width="2"/><g fill="#879487" font-family="monospace" font-size="10"><text x="24" y="70">0</text><text x="273" y="70">50</text><text x="514" y="70">100</text></g><circle cx="33" cy="45" r="7" fill="#285b43"/><path d="M33 33v-10h80" fill="none" stroke="#285b43"/><text x="118" y="26" fill="#285b43" font-family="monospace" font-size="11">37^100 mod 101 = 1</text></svg>`,
      source: "a, e, m = 37, 100, 101\nr = power_mod(a, e, m)\nprint(r)  # 1"
    }
  },
  inverse: {
    definitions: [
      ["Multiplicative inverse modulo n", "An integer u is the inverse of a modulo n when a*u ≡ 1 (mod n). It plays the role of division in modular arithmetic."],
      ["Existence condition", "An inverse exists exactly when gcd(a,n)=1. Bézout's identity proves this: if au + nv = 1, then au is 1 modulo n."],
      ["Uniqueness modulo n", "When an inverse exists, all answers differ by a multiple of n, so they represent one residue class."]
    ],
    tools: [
      ["inverse_mod(a, n)", "Returns u with a*u ≡ 1 (mod n), when gcd(a,n)=1. It raises an error if no inverse exists."],
      ["gcd(a, n)", "Returns the greatest common divisor. Check that this is 1 before asking for an inverse."],
      ["(a*u) % n", "Multiplies a by the proposed inverse and returns the remainder; the check should equal 1."]
    ]
  },
  fermat: {
    definitions: [
      ["Fermat's little theorem", "If p is prime and p does not divide a, then a^(p-1) ≡ 1 (mod p). The prime and nonzero conditions are part of the theorem."],
      ["Hypotheses", "The statements that must be true before a theorem can be applied. Here we must check that p is prime and a is not divisible by p."],
      ["Nonzero residue", "A residue modulo p other than 0. For prime p, every nonzero residue has a multiplicative inverse."]
    ],
    tools: [
      ["is_prime(p)", "Returns True if Sage certifies p is prime, and False if it is composite."],
      ["power_mod(a, e, m)", "Returns a^e modulo m; use e = p-1 and m = p to check the theorem."],
      ["a % p", "Returns the remainder of a on division by p. A nonzero result verifies p does not divide a."]
    ]
  },
  crt: {
    definitions: [
      ["Chinese remainder theorem (CRT)", "For coprime positive moduli m and n, any pair of remainders a modulo m and b modulo n comes from exactly one residue class modulo m*n."],
      ["Coprime moduli", "Moduli whose gcd is 1. This condition makes the combined solution unique modulo their product."],
      ["Least positive representative", "The smallest integer greater than 0 in a residue class. It is convenient for reporting a CRT answer but is not the only solution as an integer."]
    ],
    tools: [
      ["crt(a, b, m, n)", "Returns x satisfying x ≡ a (mod m) and x ≡ b (mod n). The order is first remainder, second remainder, first modulus, second modulus."],
      ["x % m", "Returns the remainder of x modulo m; use this to verify each congruence."],
      ["gcd(m, n)", "Checks the CRT hypothesis: the two moduli in this exercise have gcd 1."]
    ],
    visual: {
      title: "Two repeating schedules meet at 11",
      caption: "Dots mark numbers congruent to 2 mod 9; squares mark numbers congruent to 3 mod 8. Their first shared positive time is 11.",
      svg: `<svg viewBox="0 0 560 112" role="img" aria-label="Number line showing the first intersection of residues modulo 9 and 8 at 11"><text x="8" y="32" fill="#69736b" font-family="monospace" font-size="11">x ≡ 2 (mod 9)</text><text x="8" y="77" fill="#69736b" font-family="monospace" font-size="11">x ≡ 3 (mod 8)</text><line x1="155" y1="28" x2="535" y2="28" stroke="#dfe2d9"/><line x1="155" y1="73" x2="535" y2="73" stroke="#dfe2d9"/><g fill="#6d9674"><circle cx="207" cy="28" r="5"/><circle cx="254" cy="28" r="5"/><circle cx="302" cy="28" r="5"/><circle cx="349" cy="28" r="5"/><circle cx="397" cy="28" r="5"/><circle cx="444" cy="28" r="5"/><circle cx="492" cy="28" r="5"/></g><g fill="#bf8652"><rect x="207" y="68" width="10" height="10"/><rect x="249" y="68" width="10" height="10"/><rect x="291" y="68" width="10" height="10"/><rect x="333" y="68" width="10" height="10"/><rect x="375" y="68" width="10" height="10"/><rect x="417" y="68" width="10" height="10"/><rect x="459" y="68" width="10" height="10"/></g><g fill="#7c867d" font-family="monospace" font-size="9"><text x="154" y="101">1</text><text x="201" y="101">10</text><text x="248" y="101">19</text><text x="294" y="101">28</text><text x="341" y="101">37</text><text x="389" y="101">46</text><text x="435" y="101">55</text><text x="483" y="101">64</text></g><circle cx="212" cy="28" r="9" fill="none" stroke="#285b43" stroke-width="2"/><rect x="205" y="66" width="14" height="14" fill="none" stroke="#285b43" stroke-width="2"/><path d="M212 40v19" stroke="#285b43" stroke-dasharray="3 3"/><text x="221" y="52" fill="#285b43" font-family="monospace" font-size="10">x = 11</text></svg>`,
      source: "shared = [x for x in range(1, 73) if x % 9 == 2 and x % 8 == 3]\nprint(shared)  # [11]"
    }
  },
  primality: {
    definitions: [
      ["Prime and composite", "A prime integer greater than 1 has exactly two positive divisors. A composite integer greater than 1 has a divisor other than 1 and itself."],
      ["Primality test", "An algorithm that decides whether an integer is prime. A computational test can be exact or probabilistic; Sage's is_prime uses its configured proof setting."],
      ["Trial division", "Testing possible prime divisors one by one. If a composite n has a factor, at least one factor is no larger than sqrt(n), so larger candidates need not be checked."],
      ["Divisor bound", "If n = a*b with both factors greater than 1, at least one of a,b is at most sqrt(n). This makes trial division finite."]
    ],
    tools: [
      ["is_prime(n)", "Returns a Boolean value: True for prime and False for composite. Boolean values are displayed as True/False in Sage."],
      ["sqrt(n)", "Returns the square root; floor(sqrt(n)) is a sufficient upper bound for trial divisors."],
      ["range(2, B+1)", "Python's range creates the integers 2 through B when B is an integer. Combine with n % d == 0 to test divisibility."]
    ]
  },
  "prime-search": {
    definitions: [
      ["Prime gap", "The difference between consecutive primes. Near a large number x, typical gaps grow slowly, roughly on the scale of log(x), but individual gaps vary."],
      ["Prime Number Theorem", "A theorem stating that the proportion of integers near x that are prime is approximately 1/log(x) for large x."],
      ["Next prime", "The smallest prime strictly greater than a given integer."]
    ],
    tools: [
      ["next_prime(n)", "Returns the smallest prime strictly larger than n. It does not test n itself."],
      ["is_prime(n)", "Returns True for a prime and False for a composite; use it to check a candidate."],
      ["n-1", "Ordinary integer subtraction. Checking the previous integer is not enough in general; to prove a prime is the next one, all intervening integers must be composite."]
    ]
  },
  "prime-count": {
    definitions: [
      ["Prime-counting function π(x)", "The number of prime integers less than or equal to x. In this exercise, the requested count is for primes strictly less than 100; 100 is not prime, so the count is also π(100)."],
      ["List", "An ordered collection of values. A prime list lets us count or inspect the individual primes."],
      ["Half-open interval [a,b)", "The values starting at a and ending just before b. Sage's prime_range(2,100) uses this convention."]
    ],
    tools: [
      ["prime_range(a, b)", "Returns the list of primes p with a ≤ p < b. With one argument b, it returns primes p with 2 ≤ p < b."],
      ["len(L)", "Python's built-in len function returns the number of entries in a list or other collection."],
      ["prime_range(100)", "The exact call for this problem: it gives the primes below 100, and len(prime_range(100)) is 25."]
    ]
  },
  "large-factor": {
    definitions: [
      ["Composite", "An integer greater than 1 that is not prime; it can be written as a product of smaller positive integers."],
      ["Largest prime factor", "The greatest prime appearing in an integer's prime factorization."],
      ["Factoring asymmetry", "For appropriately chosen large integers, multiplying known primes is quick while recovering those primes from their product appears much harder with known classical algorithms. This is a practical observation, not a proof of security."]
    ],
    tools: [
      ["factor(n)", "Returns the prime factorization as prime/exponent pairs. For this input it displays 71 * 839 * 1471 * 6857."],
      ["max(factor(n))", "Sage factor entries are pairs, so do not apply max to the raw factorization. Use max(p for p,e in factor(n)) to get the largest prime; max is Python's largest-value function."],
      ["prod(p^e for p,e in factor(n))", "Multiplies the prime powers back together to verify the factorization. In plain Python, replace ^ with **."]
    ]
  },
  "finite-field": {
    definitions: [
      ["Field", "A number system where addition, subtraction, multiplication, and division by any nonzero element are possible."],
      ["Finite field 𝔽ₚ", "A field with finitely many elements. For prime p, the integers modulo p form a field with p elements."],
      ["Group", "A set with an operation that stays in the set, is associative, has an identity, and gives every element an inverse."],
      ["Multiplicative group of 𝔽ₚ", "The p-1 nonzero field elements with multiplication as the operation and 1 as the identity. They form a group because every nonzero field element has an inverse."]
    ],
    tools: [
      ["GF(p)", "Creates the finite field with p elements; GF means Galois field. p must be a prime for this notation."],
      ["F(a)", "Converts the integer a into an element of the field F, reducing it modulo p."],
      ["a^e", "Raises a Sage value to exponent e. In 𝔽₇ the result is reduced within the field; in plain Python use ** for powers."]
    ]
  },
  "quadratic-residues": {
    definitions: [
      ["Quadratic residue modulo p", "A residue a is a quadratic residue if a ≡ x² (mod p) for some integer x. If no such x exists, it is a quadratic nonresidue."],
      ["Legendre symbol (a/p)", "For odd prime p, it is 0 if p divides a, +1 if a is a nonzero square modulo p, and -1 if it is not a square."],
      ["Euler's criterion", "For odd prime p not dividing a, a^((p-1)/2) is congruent to 1 for a square and -1 modulo p for a nonsquare."]
    ],
    tools: [
      ["legendre_symbol(a, p)", "Returns 1, 0, or -1 with the meanings defined above. Inputs should use an odd prime p."],
      ["power_mod(a, e, p)", "Computes a^e modulo p; set e=(p-1)//2 to check Euler's criterion. // is integer division in Sage/Python."],
      ["GF(p)", "Creates the finite field modulo prime p; you can list x^2 for x in GF(p) to see the square residues directly."]
    ]
  },
  "multiplicative-order": {
    definitions: [
      ["Multiplicative order", "The smallest positive integer k for which a^k ≡ 1 (mod n), provided a has an inverse modulo n."],
      ["Modular integer Mod(a,n)", "A Sage object representing the residue class of a modulo n. Arithmetic on it is reduced modulo n."],
      ["Group order", "The number of elements in a group. For prime p, the nonzero residues modulo p form a group with p-1 elements."]
    ],
    tools: [
      ["Mod(a, n)", "Constructs the residue class of a modulo n. For example, Mod(2,13) is the class of 2 modulo 13."],
      ["a.multiplicative_order()", "A method on a modular value that returns its multiplicative order. Parentheses call the method; it fails if a is not invertible."],
      ["a^k % n", "Computes a power and its remainder, which you can use to list the cycle by hand. Sage uses ^ for exponentiation."]
    ],
    visual: {
      title: "Powers of 2 cycle through every nonzero residue mod 13",
      caption: "The sequence returns to 1 after 12 powers, so the multiplicative order is 12.",
      svg: `<svg viewBox="0 0 560 118" role="img" aria-label="Twelve residues generated by powers of 2 modulo 13"><path d="M35 60H525" stroke="#dfe2d9" stroke-width="2"/><g fill="#e8eee5" stroke="#b8cbb8"><circle cx="45" cy="60" r="17"/><circle cx="87" cy="60" r="17"/><circle cx="129" cy="60" r="17"/><circle cx="171" cy="60" r="17"/><circle cx="213" cy="60" r="17"/><circle cx="255" cy="60" r="17"/><circle cx="297" cy="60" r="17"/><circle cx="339" cy="60" r="17"/><circle cx="381" cy="60" r="17"/><circle cx="423" cy="60" r="17"/><circle cx="465" cy="60" r="17"/><circle cx="507" cy="60" r="17"/></g><circle cx="45" cy="60" r="17" fill="#285b43" stroke="#285b43"/><g fill="#33493a" font-family="monospace" font-size="11" text-anchor="middle"><text x="45" y="64" fill="white">1</text><text x="87" y="64">2</text><text x="129" y="64">4</text><text x="171" y="64">8</text><text x="213" y="64">3</text><text x="255" y="64">6</text><text x="297" y="64">12</text><text x="339" y="64">11</text><text x="381" y="64">9</text><text x="423" y="64">5</text><text x="465" y="64">10</text><text x="507" y="64">7</text></g><text x="45" y="25" fill="#718074" font-family="monospace" font-size="9" text-anchor="middle">k=0</text><text x="507" y="25" fill="#718074" font-family="monospace" font-size="9" text-anchor="middle">k=11</text><path d="M507 84 C470 112 82 112 45 84" fill="none" stroke="#285b43" stroke-dasharray="4 4"/><text x="275" y="112" fill="#285b43" font-family="monospace" font-size="10" text-anchor="middle">next power: 2^12 ≡ 1 (mod 13)</text></svg>`,
      source: "a, p = 2, 13\nvalues = [power_mod(a, k, p) for k in range(p - 1)]\nprint(values)  # [1, 2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7]"
    }
  },
  "primitive-root": {
    definitions: [
      ["Cyclic group", "A group whose elements are all powers of one element."],
      ["Generator", "An element whose powers produce every element of a group."],
      ["Primitive root modulo p", "A generator of the multiplicative group of nonzero residues modulo prime p. Its order is p-1."],
      ["Order of an element", "The smallest positive exponent k for which the element raised to k is the identity; for multiplication, the identity is 1."]
    ],
    tools: [
      ["primitive_root(p)", "Returns a primitive root modulo prime p. Sage's returned root is not necessarily the smallest one, so this lesson searches candidates in increasing order."],
      ["Mod(a, p).multiplicative_order()", "Creates the residue class and returns the length of its power cycle. A candidate is a primitive root exactly when this equals p-1."],
      ["power_mod(a, k, p)", "Computes the k-th power modulo p, useful for checking a proposed generator's cycle."]
    ]
  },
  "rsa-parameters": {
    definitions: [
      ["RSA", "A public-key cryptosystem whose arithmetic is performed modulo a product n=pq of two primes. This lesson uses tiny example primes, not secure keys."],
      ["Public-key cryptosystem", "A system with a public operation anyone can use and a private key that lets its owner reverse that operation."],
      ["RSA modulus n", "The product p*q. It is public in RSA; the factors p and q are kept secret in a real key."],
      ["Totient φ(n)", "The number of invertible residues modulo n. For distinct primes p and q, φ(pq)=(p-1)(q-1)."]
    ],
    tools: [
      ["euler_phi(n)", "Returns the number of invertible residue classes modulo n."],
      ["p * q", "Ordinary multiplication. The comma assignment p, q = 61, 53 assigns the two values at once."],
      ["(p-1)*(q-1)", "The shortcut formula for φ(pq) when p and q are distinct primes."]
    ]
  },
  "rsa-private": {
    definitions: [
      ["Public exponent e", "The exponent used for encryption; it is public and must be coprime to φ(n)."],
      ["Private exponent d", "The exponent used for decryption. It is chosen so ed ≡ 1 (mod φ(n))."],
      ["Modular inverse", "A value d satisfying e*d ≡ 1 modulo φ(n); it exists because gcd(e,φ(n))=1."]
    ],
    tools: [
      ["inverse_mod(e, phi_n)", "Returns d such that e*d has remainder 1 modulo phi_n. It requires e and phi_n to be coprime."],
      ["(e*d) % phi_n", "Checks the defining inverse condition; the result should be 1."],
      ["%", "The remainder operator. In a congruence check, (e*d) % phi_n == 1 means e*d ≡ 1 (mod phi_n)."]
    ]
  },
  "rsa-encrypt": {
    definitions: [
      ["Message m", "The integer being represented in RSA; it must satisfy 0 ≤ m < n."],
      ["Encryption", "The public computation c ≡ m^e (mod n), where c is the ciphertext."],
      ["Ciphertext c", "The residue produced by encryption. It hides the message only when real RSA is used with suitable large keys and secure encoding."]
    ],
    tools: [
      ["power_mod(m, e, n)", "Computes m^e modulo n efficiently and returns the ciphertext representative."],
      ["m, e, n = ...", "Python/Sage multiple assignment: each variable receives the corresponding value on the right."],
      ["^", "Exponentiation in Sage mode. In plain Python, write m ** e; power_mod avoids constructing the large power either way."]
    ],
    visual: {
      title: "Toy RSA round trip",
      caption: "With n=3233, the public exponent maps 65 to 2790; the private exponent maps it back.",
      svg: `<svg viewBox="0 0 560 112" role="img" aria-label="RSA encryption and decryption diagram from message 65 to ciphertext 2790 and back"><rect x="12" y="27" width="116" height="54" rx="8" fill="#eef3eb" stroke="#d5e0d3"/><rect x="220" y="27" width="116" height="54" rx="8" fill="#f4eadf" stroke="#ead9c6"/><rect x="432" y="27" width="116" height="54" rx="8" fill="#eef3eb" stroke="#d5e0d3"/><text x="70" y="49" fill="#718074" font-family="monospace" font-size="9" text-anchor="middle">MESSAGE</text><text x="70" y="68" fill="#285b43" font-family="monospace" font-size="16" text-anchor="middle">65</text><text x="278" y="49" fill="#9b714d" font-family="monospace" font-size="9" text-anchor="middle">CIPHERTEXT</text><text x="278" y="68" fill="#805c3d" font-family="monospace" font-size="16" text-anchor="middle">2790</text><text x="490" y="49" fill="#718074" font-family="monospace" font-size="9" text-anchor="middle">RECOVERED</text><text x="490" y="68" fill="#285b43" font-family="monospace" font-size="16" text-anchor="middle">65</text><path d="M135 54h72m-8-6 8 6-8 6M345 54h72m-8-6 8 6-8 6" fill="none" stroke="#718074" stroke-width="2"/><text x="171" y="27" fill="#718074" font-family="monospace" font-size="9" text-anchor="middle">m^17 mod 3233</text><text x="381" y="27" fill="#718074" font-family="monospace" font-size="9" text-anchor="middle">c^2753 mod 3233</text></svg>`,
      source: "n, e, d, m = 3233, 17, 2753, 65\nc = power_mod(m, e, n)\nrecovered = power_mod(c, d, n)\nprint(c, recovered)  # 2790 65"
    }
  },
  "rsa-decrypt": {
    definitions: [
      ["Decryption", "Computing m ≡ c^d (mod n) with the private exponent d to recover the message."],
      ["Euler's theorem", "If gcd(a,n)=1, then a^φ(n) ≡ 1 (mod n). It explains the RSA round trip when the message is coprime to n."],
      ["Exponent relation", "Since d is the inverse of e modulo φ(n), there is an integer k with ed = 1 + kφ(n). This makes (m^e)^d = m^(1+kφ(n))."]
    ],
    tools: [
      ["power_mod(c, d, n)", "Computes c^d modulo n and returns the decrypted representative."],
      ["gcd(m, n)", "Checks the coprimality condition used in Euler's theorem. For this toy message it equals 1."],
      ["e*d == 1 (mod φ(n))", "In code, test this as (e*d) % euler_phi(n) == 1. It verifies that d is the inverse exponent."]
    ]
  },
  "quadratic-field": {
    definitions: [
      ["Number field", "A finite-degree extension of the rational numbers ℚ; its elements can be added, multiplied, and divided by nonzero elements."],
      ["Quadratic field ℚ(√d)", "The field obtained by adjoining a square root of a nonsquare integer d. It has dimension two over ℚ."],
      ["Discriminant", "An integer invariant of a number field that encodes arithmetic information, including how primes can split or ramify."]
    ],
    tools: [
      ["QuadraticField(d)", "Constructs the quadratic field ℚ(√d). For d=-23, this represents ℚ(√-23)."],
      ["K.discriminant()", "Calls the discriminant method on the field K and returns its integer discriminant."],
      ["% 4", "Computes a remainder modulo 4. For squarefree d, the quadratic field discriminant is d if d ≡ 1 (mod 4), and 4d otherwise."]
    ]
  },
  "class-number": {
    definitions: [
      ["Ring of integers", "The subring of a number field consisting of its algebraic integers; it is the natural setting for factorization in that field."],
      ["Ideal", "A subset of a ring closed under addition and under multiplication by any ring element. Ideals let us recover unique factorization even when elements do not factor uniquely."],
      ["Equivalent ideals", "Two nonzero ideals are equivalent when one is a nonzero field multiple of the other. This treats ideals that differ by a principal factor as the same class."],
      ["Ideal class group", "A finite abelian group of equivalence classes of ideals; it measures which ideals fail to be generated by one element."],
      ["Class number", "The number of elements in the ideal class group. A class number greater than 1 means the ring of integers does not have unique factorization of elements."],
      ["Algebraic integer", "A root of a monic polynomial with integer coefficients. A monic polynomial has leading coefficient 1."],
      ["Unit", "An element of a ring that has a multiplicative inverse in that same ring."]
    ],
    tools: [
      ["K.class_number()", "Computes and returns the class number of the field K."],
      ["K.class_group()", "Computes the ideal class group object. Its size is the class number; Sage can display its group structure."],
      ["QuadraticField(-23)", "Constructs the example field used in this lesson. K is simply a variable name holding that field."]
    ]
  },
  "compare-classes": {
    definitions: [
      ["Principal ideal", "An ideal generated by one ring element, written (a) for the ideal of multiples of a."],
      ["Unique factorization of elements", "The property that every nonzero nonunit element factors into irreducible elements in exactly one way, apart from order and units."],
      ["Class-number criterion", "For the ring of integers of a number field, class number 1 is equivalent to unique factorization of elements. If the class number is larger, it fails."]
    ],
    tools: [
      ["K.class_number()", "Returns the class number of K. Here it is 2 for ℚ(√-5) and 3 for ℚ(√-23)."],
      ["QuadraticField(d)", "Constructs ℚ(√d); assigning two such fields to K and L lets you compare their values."],
      ["== 1", "A comparison that returns True exactly when the class number is 1; that is the unique-factorization criterion in this setting."]
    ]
  },
  "prime-splitting": {
    definitions: [
      ["Prime ideal", "A proper ideal P for which a*b in P implies a in P or b in P. Prime ideals play the role of prime numbers in a number ring."],
      ["Ring of integers O_K", "The algebraic integers in the field K. The notation (2)O_K means the ideal generated by 2 in that ring."],
      ["Prime above p", "A prime ideal in a number field whose intersection with the ordinary integers is generated by the rational prime p."],
      ["Splitting, inertness, and ramification", "A rational prime splits when its ideal factors into two distinct prime ideals. It is inert if the ideal remains prime, and ramified if a prime ideal factor repeats."]
    ],
    tools: [
      ["K.primes_above(p)", "Returns the list of prime ideals of K lying above the rational prime p."],
      ["len(L)", "Returns the number of entries in a list L. Thus len(K.primes_above(2)) counts the prime ideals above 2."],
      ["QuadraticField(d)", "Builds the field K in which Sage will factor the ideal generated by p."]
    ]
  }
};

// The visual panels are drawn as inline SVG, so the site needs no image host.
// Their underlying values are regenerated by the Sage/Python snippets shown.
lessonSupport.primality.visual = {
  title: "Prime numbers in a small window",
  caption: "Green cells are prime; muted cells are composite. One is neither, because it has only one positive divisor.",
  svg: `<svg viewBox="0 0 560 138" role="img" aria-label="Numbers 1 through 30 with primes highlighted"><g font-family="monospace" font-size="10" text-anchor="middle">${Array.from({length:30},(_,i)=>{const n=i+1,x=8+(i%5)*110,y=8+Math.floor(i/5)*21,prime=[2,3,5,7,11,13,17,19,23,29].includes(n),fill=prime?"#e3ede1":n===1?"#f4eadf":"#f0f1eb",color=prime?"#285b43":n===1?"#8b755e":"#788378";return `<rect x="${x}" y="${y}" width="100" height="17" rx="4" fill="${fill}"/><text x="${x+50}" y="${y+12}" fill="${color}">${n}${prime?" · prime":n===1?" · neither":""}</text>`}).join("")}</g></svg>`,
  source: "small_primes = [n for n in range(2, 31) if is_prime(n)]\nprint(small_primes)  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]"
};
lessonSupport["prime-splitting"].visual = {
  title: "The prime 2 splits into two prime ideals",
  caption: "In the ring of integers of ℚ(√−23), the ideal generated by 2 factors into two distinct prime ideals.",
  svg: `<svg viewBox="0 0 560 128" role="img" aria-label="The ideal generated by 2 factors into two distinct prime ideals"><rect x="206" y="8" width="148" height="40" rx="7" fill="#eef3eb" stroke="#d5e0d3"/><text x="280" y="33" text-anchor="middle" fill="#285b43" font-family="serif" font-size="19">(2)O_K</text><path d="M280 48v23M280 71H150v14M280 71h130v14" fill="none" stroke="#829384" stroke-width="2"/><rect x="73" y="86" width="154" height="35" rx="7" fill="#e3ede1" stroke="#b9d0bc"/><rect x="333" y="86" width="154" height="35" rx="7" fill="#e3ede1" stroke="#b9d0bc"/><text x="150" y="109" text-anchor="middle" fill="#285b43" font-family="serif" font-size="16">𝔭₁</text><text x="410" y="109" text-anchor="middle" fill="#285b43" font-family="serif" font-size="16">𝔭₂</text><text x="280" y="125" text-anchor="middle" fill="#718074" font-family="monospace" font-size="9">two distinct prime ideals</text></svg>`,
  source: "K = QuadraticField(-23)\nideals = K.primes_above(2)\nprint(len(ideals))  # 2\nprint(ideals)  # the two prime ideals above 2"
};

const storageKey = "nt-fieldnotes-progress-v2";
let completed = new Set();
try { completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]")); } catch {}
let current = 0;
let notebookModulePromise;
let notebookDbPromise;
let mountedNotebook = null;
let mountedKernel = null;
let notebookGeneration = 0;
const $ = (selector, root = document) => root.querySelector(selector);
const clean = (value) => value.toLowerCase().replace(/[\s*×,()=]/g, "").replace(/[−–]/g, "-");
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function disposeNotebook() {
  notebookGeneration += 1;
  const oldNotebook = mountedNotebook;
  mountedNotebook = null;
  if (oldNotebook) void oldNotebook.flush().catch(() => {}).finally(() => oldNotebook.destroy());
  mountedKernel?.close();
  mountedKernel = null;
}

async function mountNotebook(lesson, host, generation) {
  try {
    notebookModulePromise ||= import("./vendor/sagebrush/sagebrush-notebook.js");
    notebookDbPromise ||= notebookModulePromise.then(({ openDb }) => openDb("number-theory-fieldnotes"));
    const [{ createNotebook, WorkerKernel, IdbStore, cellId }, db] = await Promise.all([notebookModulePromise, notebookDbPromise]);
    if (generation !== notebookGeneration || !host.isConnected) return;
    const kernel = new WorkerKernel({
      createWorker: () => new Worker(new URL("./vendor/sagebrush/sagebrush-worker.js", document.baseURI), { type: "module" })
    });
    const notebook = createNotebook(host, {
      kernel,
      mode: "sage",
      assetBase: new URL("./vendor/sagebrush/", document.baseURI).href
    });
    mountedKernel = kernel;
    mountedNotebook = notebook;
    const cells = [
      {
        id: cellId(),
        type: "markdown",
        code: `# ${lesson.title}\n\n${lesson.lede}\n\n**Problem:** ${lesson.question.replace(/<[^>]*>/g, "")}\n\nEdit the starter cell below and press **Shift+Enter** to run it.`
      },
      { id: cellId(), code: lesson.starter }
    ];
    kernel.start();
    await notebook.attach(new IdbStore(db, `fieldnotes-${lesson.id}`, { name: lesson.title, mode: "sage", cells }));
    if (generation !== notebookGeneration) {
      notebook.destroy();
      kernel.close();
      if (mountedNotebook === notebook) mountedNotebook = null;
      if (mountedKernel === kernel) mountedKernel = null;
    }
  } catch (error) {
    if (generation !== notebookGeneration || !host.isConnected) return;
    const message = document.createElement("p");
    message.className = "notebook-error";
    message.textContent = `Sagebrush could not start here: ${error?.message ?? error}. You can still open the notebook in a separate tab.`;
    host.replaceChildren(message);
  }
}

function notebookLink(lesson) {
  const data = JSON.stringify([
    { md: `# ${lesson.title}\n\n${lesson.lede}\n\n**Problem:** ${lesson.question.replace(/<[^>]*>/g, "")}\n\nWork it out in Sage mode. Change the code cell, run it with **Shift+Enter**, and explain what the output means.` },
    lesson.starter
  ]);
  const bytes = new TextEncoder().encode(data);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const encoded = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `https://sagebrush.space/#m=sage&c=${encoded}`;
}

function renderNav() {
  const list = $("#lesson-list");
  list.innerHTML = chapters.map((chapter, chapterIndex) => {
    const inChapter = lessons.map((lesson, index) => ({ lesson, index })).filter(item => item.lesson.chapter === chapterIndex);
    const isCurrent = inChapter.some(item => item.index === current);
    const chapterDone = inChapter.filter(item => completed.has(item.lesson.id)).length;
    const items = inChapter.map(({ lesson, index }, chapterLessonIndex) => `
      <li><button class="lesson-tab ${index === current ? "active" : ""} ${completed.has(lesson.id) ? "done" : ""}" data-index="${index}" type="button" aria-current="${index === current ? "step" : "false"}">
        <span class="lesson-number">${completed.has(lesson.id) ? "✓" : `${chapterIndex + 1}.${chapterLessonIndex + 1}`}</span><span class="tab-title">${lesson.title}</span>
      </button></li>`).join("");
    return `<li class="chapter-group"><details ${isCurrent ? "open" : ""}><summary><span class="chapter-count">${String(chapterIndex + 1).padStart(2, "0")}</span><span class="chapter-nav-title">${chapter.title}</span><span class="chapter-nav-progress">${chapterDone}/${inChapter.length}</span></summary><ol>${items}</ol></details></li>`;
  }).join("");
  list.querySelectorAll(".lesson-tab").forEach(button => button.addEventListener("click", () => { current = Number(button.dataset.index); render(); }));
}

function renderProgress() {
  const count = [...completed].filter(id => lessons.some(lesson => lesson.id === id)).length;
  const total = lessons.length;
  $("#top-progress").textContent = `${count} / ${total} solved`;
  $("#progress-fraction").textContent = `${count} / ${total}`;
  $("#progress-bar").style.width = `${count / total * 100}%`;
  $("#progress-caption").textContent = count === total ? "Curriculum complete. Keep experimenting." : count ? `${count} lesson${count === 1 ? "" : "s"} solved. Keep following the number trail.` : "Begin with divisibility and the structure of integers.";
}

function render() {
  disposeNotebook();
  renderNav(); renderProgress();
  const lesson = lessons[current], chapter = chapters[lesson.chapter], solved = completed.has(lesson.id);
  const support = lessonSupport[lesson.id];
  const panel = $("#lesson-panel");
  const firstInChapter = current === 0 || lessons[current - 1].chapter !== lesson.chapter;
  const chapterLessons = lessons.filter(item => item.chapter === lesson.chapter).length;
  const chapterLesson = lessons.slice(0, current).filter(item => item.chapter === lesson.chapter).length + 1;
  const chapterIntro = firstInChapter ? `<div class="chapter-intro"><b>CHAPTER ${String(lesson.chapter + 1).padStart(2, "0")} · ${chapter.title}</b><p>${chapter.overview}</p><span>${chapter.goals}</span></div>` : "";
  const definitionBox = `<section class="learning-box definition-box" aria-label="New definitions"><h3><span class="learning-box-icon">D</span>New definitions</h3><dl>${support.definitions.map(([term, definition]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(definition)}</dd></div>`).join("")}</dl></section>`;
  const toolBox = `<section class="learning-box tool-box" aria-label="New Sagebrush code tools"><h3><span class="learning-box-icon">{ }</span>New code tools · Sage mode</h3><dl>${support.tools.map(([name, description]) => `<div><dt><code>${escapeHtml(name)}</code></dt><dd>${escapeHtml(description)}</dd></div>`).join("")}</dl><p class="tool-note">Sage mode accepts Python-style assignment, loops, and lists. Sage's <code>^</code> means exponentiation; in regular Python use <code>**</code>.</p></section>`;
  const visual = support.visual ? `<figure class="math-visual"><figcaption><strong>${escapeHtml(support.visual.title)}</strong><span>${escapeHtml(support.visual.caption)}</span></figcaption>${support.visual.svg}<details><summary>Recreate the figure's data with Sage/Python</summary><pre><code>${escapeHtml(support.visual.source)}</code></pre></details></figure>` : "";
  panel.innerHTML = `
    <div class="module-meta"><span class="module-tag">${lesson.topic}</span><span>CH ${String(lesson.chapter + 1).padStart(2, "0")} · LESSON ${chapterLesson} / ${chapterLessons}</span><span>·</span><span>${lesson.time}</span></div>
    <div class="module-heading"><h2>${lesson.title}</h2><span class="solved-stamp ${solved ? "show" : ""}">✓ SOLVED</span></div>
    ${chapterIntro}
    <p class="module-lede">${lesson.lede}</p>
    <div class="question-card"><span class="question-symbol">?</span><div><p class="question-label">YOUR PROBLEM</p><p>${lesson.question}</p></div></div>
    <p class="idea-row"><span class="bulb">✳</span><span><b>The idea.</b> ${lesson.idea}</span></p>
    <div class="learning-resources">${definitionBox}${toolBox}${visual}</div>
    <section class="notebook-card" aria-labelledby="notebook-heading">
      <div class="notebook-heading"><div><p class="notebook-kicker">YOUR NUMBER THEORY LAB · SAGE MODE</p><h3 id="notebook-heading">Compute it here</h3></div><a class="notebook-popout" href="${notebookLink(lesson)}" target="_blank" rel="noopener noreferrer">Open in a separate tab <span aria-hidden="true">↗</span></a></div>
      <div class="notebook-host" id="sagebrush-notebook" aria-label="Sagebrush Sage notebook"><p class="notebook-loading" role="status">Starting Sagebrush…</p></div>
      <p class="notebook-caption">This editable Sagebrush notebook runs in your browser. Change the starter code and press <kbd>Shift</kbd> + <kbd>Enter</kbd> to run it.</p>
    </section>
    <details class="work-hint"><summary>Need a nudge?</summary><p>${lesson.hint}</p></details>
    <div class="answer-block"><p class="answer-title">BRING YOUR RESULT BACK HERE</p><form class="answer-form" id="answer-form"><input class="answer-input" id="answer-input" autocomplete="off" spellcheck="false" aria-label="Your answer" placeholder="${lesson.placeholder}" ${solved ? "disabled" : ""}><button class="check-button" type="submit" ${solved ? "disabled" : ""}>${solved ? "Solved ✓" : "Check answer"}</button></form><p class="answer-feedback ${solved ? "good" : ""}" id="answer-feedback" aria-live="polite">${solved ? lesson.success : "Use the Sagebrush notebook to work it out, then enter your result."}</p></div>
    <div class="lesson-bottom"><span class="lesson-bottom-note">${lesson.concept}</span>${current > 0 ? `<button class="prev-button" id="prev-button" type="button">← Previous</button>` : ""}<button class="next-button ${solved && current < lessons.length - 1 ? "show" : ""}" id="next-button" type="button">${current === lessons.length - 1 ? "Curriculum complete" : "Next lesson"}<span>→</span></button></div>`;
  mountNotebook(lesson, $("#sagebrush-notebook", panel), notebookGeneration);
  $("#answer-form", panel).addEventListener("submit", event => {
    event.preventDefault();
    const entry = clean($("#answer-input", panel).value);
    const feedback = $("#answer-feedback", panel);
    if (lesson.answer.map(clean).includes(entry)) {
      completed.add(lesson.id);
      localStorage.setItem(storageKey, JSON.stringify([...completed]));
      renderNav();
      renderProgress();
      $(".solved-stamp", panel).classList.add("show");
      $("#answer-input", panel).disabled = true;
      $(".check-button", panel).disabled = true;
      $(".check-button", panel).textContent = "Solved ✓";
      $("#answer-feedback", panel).textContent = lesson.success;
      $("#answer-feedback", panel).className = "answer-feedback good";
      if (current < lessons.length - 1) $("#next-button", panel).classList.add("show");
    } else {
      feedback.textContent = entry ? "Not quite. Inspect your Sagebrush output and try again." : "Run the Sagebrush computation, then enter your result.";
      feedback.className = "answer-feedback try";
    }
  });
  const next = $("#next-button", panel);
  if (next) next.addEventListener("click", () => navigate(current + 1));
  const previous = $("#prev-button", panel);
  if (previous) previous.addEventListener("click", () => navigate(current - 1));
}

function navigate(index) {
  current = Math.max(0, Math.min(lessons.length - 1, index));
  render();
  document.querySelector(".workbench").scrollIntoView({ behavior: "smooth", block: "start" });
}

$("#reset-progress").addEventListener("click", () => {
  if (!completed.size) return;
  completed.clear(); localStorage.removeItem(storageKey); render();
});
render();
