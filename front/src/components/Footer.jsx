import Link from 'next/link'

function Footer() {
  return (
    <div id="footer">
      <p>#Copyright animalplayground team Loïc Bouvier & Benjamin Solano</p>
      <span>
        <Link id="btn-admin" href="/admin">
          {' '}
          #
        </Link>
      </span>
    </div>
  )
}

export default Footer
