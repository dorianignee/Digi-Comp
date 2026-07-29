<script>
  import DigiComp from "$lib/components/DigiComp.svelte";
</script>

<h1>Digi-Comp I</h1>

<p>The Digi-Comp I was a plastic toy computer that could be used to demonstrate basic digital logic concepts. 
  It was marketed as the "first real operating computer in plastic".
  It was invented in 1963 by the company E.S.R. and paved the way for many people who became interested in computer science. 
  Many of these individuals went on to become software developers or engineers.</p>

<p>You can download the instruction manual on <a href="https://archive.org/details/digicomp_i/digi-comp1-manual-c-s/">archive.org</a>.</p>

<!-- class "flex-item" will occupy the max. height, so the footer is at the bottom -->
<div class="flex-item" style="align-self: center;">
  <DigiComp />
</div>

<p class="footer">Copyright © 2026 Dorian Ignee. Feel free to contribute on <a href="https://github.com/dorianignee/Digi-Comp">GitHub</a>.</p>

<style>

  h1 {
    font-family: "Courier New", Courier, monospace;
    text-align: center;
  }

  p {
    font-family: "Verdana", Geneva, Tahoma, sans-serif;
    text-align: center;
    max-width: 600px;
    margin: 2rem auto;
  }

  .footer {
    margin-top: 2rem;
    font-size: 0.8rem;
    text-align: center;
  }
</style>