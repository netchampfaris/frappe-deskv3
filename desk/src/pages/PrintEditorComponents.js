const Header = {
  name: 'Header',
  template: `<div class="text-right">
      <h1>Heading</h1>
    </div>`,
}

const Field = {
  name: 'Field',
  template: `<div class="border rounded p-4 mb-2">Status</div>`,
}

const Container = {
  name: 'Container',
  template: `<div class="flex"><slot></slot></div>`,
}

const Column = {
  name: 'Column',
  template: `<div class="flex-1"><slot></slot></div>`,
}

export { Header, Field, Container, Column }
