const chapters = [
  {
    id: "integer-arithmetic", title: "Integer structure", short: "Integers",
    overview: "Build the vocabulary of number theory: divisibility, gcds, prime factorization, and the arithmetic functions that summarize them.",
    goals: "By the end, use the Euclidean algorithm, recognize prime factors, and compute divisor counts and Euler's totient."
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
    id: "totient", chapter: 0, title: "Count the coprime residues", topic: "ARITHMETIC FUNCTIONS", time: "6 MIN",
    lede: "Euler's totient φ(n) counts the integers from 1 through n that are coprime to n.",
    question: "How many residues <span class=\"math\">a</span> modulo <span class=\"math\">360</span> have <span class=\"math\">gcd(a, 360) = 1</span>?",
    idea: "If n = ∏ pᵉ, then φ(n) = ∏ pᵉ⁻¹(p−1). Prime factorization turns the count into a product.",
    starter: "# Factor 360, then count the residues coprime to it\nn = 360\n\n",
    hint: "Compare a direct count with Sage's <code>euler_phi(n)</code>. What does the prime factorization tell you about the formula?",
    answer: ["96"], placeholder: "φ(360) = ?",
    success: "Right: φ(360) = 96. Exactly 96 residue classes have multiplicative inverses modulo 360.",
    concept: "The totient links factorization to the size of the group of units modulo n."
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

const storageKey = "nt-fieldnotes-progress-v2";
let completed = new Set();
try { completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]")); } catch {}
let current = 0;
const $ = (selector, root = document) => root.querySelector(selector);
const clean = (value) => value.toLowerCase().replace(/[\s*×,()=]/g, "").replace(/[−–]/g, "-");

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
  renderNav(); renderProgress();
  const lesson = lessons[current], chapter = chapters[lesson.chapter], solved = completed.has(lesson.id);
  const panel = $("#lesson-panel");
  const firstInChapter = current === 0 || lessons[current - 1].chapter !== lesson.chapter;
  const chapterLesson = lessons.slice(0, current).filter(item => item.chapter === lesson.chapter).length + 1;
  const chapterIntro = firstInChapter ? `<div class="chapter-intro"><b>CHAPTER ${String(lesson.chapter + 1).padStart(2, "0")} · ${chapter.title}</b><p>${chapter.overview}</p><span>${chapter.goals}</span></div>` : "";
  panel.innerHTML = `
    <div class="module-meta"><span class="module-tag">${lesson.topic}</span><span>CH ${String(lesson.chapter + 1).padStart(2, "0")} · LESSON ${chapterLesson} / 4</span><span>·</span><span>${lesson.time}</span></div>
    <div class="module-heading"><h2>${lesson.title}</h2><span class="solved-stamp ${solved ? "show" : ""}">✓ SOLVED</span></div>
    ${chapterIntro}
    <p class="module-lede">${lesson.lede}</p>
    <div class="question-card"><span class="question-symbol">?</span><div><p class="question-label">YOUR PROBLEM</p><p>${lesson.question}</p></div></div>
    <p class="idea-row"><span class="bulb">✳</span><span><b>The idea.</b> ${lesson.idea}</span></p>
    <div class="launch-row"><a class="launch-button" href="${notebookLink(lesson)}" target="_blank" rel="noopener noreferrer"><span>Open Sagebrush notebook</span><span class="arrow" aria-hidden="true">↗</span></a><span class="launch-hint">Editable Sage notebook · opens in a new tab</span></div>
    <details class="work-hint"><summary>Need a nudge?</summary><p>${lesson.hint}</p></details>
    <div class="answer-block"><p class="answer-title">BRING YOUR RESULT BACK HERE</p><form class="answer-form" id="answer-form"><input class="answer-input" id="answer-input" autocomplete="off" spellcheck="false" aria-label="Your answer" placeholder="${lesson.placeholder}" ${solved ? "disabled" : ""}><button class="check-button" type="submit" ${solved ? "disabled" : ""}>${solved ? "Solved ✓" : "Check answer"}</button></form><p class="answer-feedback ${solved ? "good" : ""}" id="answer-feedback" aria-live="polite">${solved ? lesson.success : "Use the Sagebrush notebook to work it out, then enter your result."}</p></div>
    <div class="lesson-bottom"><span class="lesson-bottom-note">${lesson.concept}</span>${current > 0 ? `<button class="prev-button" id="prev-button" type="button">← Previous</button>` : ""}<button class="next-button ${solved && current < lessons.length - 1 ? "show" : ""}" id="next-button" type="button">${current === lessons.length - 1 ? "Curriculum complete" : "Next lesson"}<span>→</span></button></div>`;
  $("#answer-form", panel).addEventListener("submit", event => {
    event.preventDefault();
    const entry = clean($("#answer-input", panel).value);
    const feedback = $("#answer-feedback", panel);
    if (lesson.answer.map(clean).includes(entry)) {
      completed.add(lesson.id);
      localStorage.setItem(storageKey, JSON.stringify([...completed]));
      render();
      $("#answer-feedback", panel).textContent = lesson.success;
      $("#answer-feedback", panel).className = "answer-feedback good";
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
