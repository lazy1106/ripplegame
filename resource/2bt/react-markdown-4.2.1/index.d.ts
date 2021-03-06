// Type definitions for react-markdown > v3.3.0
// Project: https://github.com/rexxars/react-markdown
// Definitions by:
// - Ruslan Ibragimov <https://github.com/IRus>
// - Kohei Asai <me@axross.io>
// - ClassicDarkChocolate <https://github.com/ClassicDarkChocolate>
// - Espen Hovlandsdal <https://espen.codes/>
// - Ted Piotrowski <https://github.com/ted-piotrowski>

//import {Component, ReactElement, ReactNode, ReactType} from 'react'
//import {RemarkParseOptions} from 'remark-parse'

declare class ReactMarkdown extends React.Component<ReactMarkdown.ReactMarkdownProps, {}> { }

declare namespace ReactMarkdown {

	// haska: copied from https://github.com/remarkjs/remark/blob/master/packages/remark-parse/types/index.d.ts
	interface RemarkParseOptions {
		gfm: boolean
		commonmark: boolean
		footnotes: boolean
		blocks: string[]
		pedantic: boolean
	}

	interface Point {
		readonly line: number
		readonly column: number
		readonly offset?: number
	}

	interface Position {
		readonly start: Point
		readonly end: Point
		readonly indent?: number[]
	}

	export type NodeType =
		| 'root'
		| 'text'
		| 'break'
		| 'paragraph'
		| 'emphasis'
		| 'strong'
		| 'thematicBreak'
		| 'blockquote'
		| 'delete'
		| 'link'
		| 'image'
		| 'linkReference'
		| 'imageReference'
		| 'table'
		| 'tableHead'
		| 'tableBody'
		| 'tableRow'
		| 'tableCell'
		| 'list'
		| 'listItem'
		| 'definition'
		| 'heading'
		| 'inlineCode'
		| 'code'
		| 'html'
		| 'virtualHtml'

	export type AlignType =
		| "left"
		| "right"
		| "center"
		| null

	export type ReferenceType =
		| "shortcut"
		| "collapsed"
		| "full"

	export type LinkTargetResolver = (uri: string, text: string, title?: string) => string

	export interface ReactMarkdownProps {
		readonly className?: string
		readonly source?: string
		readonly sourcePos?: boolean
		readonly includeNodeIndex?: boolean
		readonly rawSourcePos?: boolean
		readonly escapeHtml?: boolean
		readonly skipHtml?: boolean
		readonly allowNode?: (node: MarkdownAbstractSyntaxTree, index: number, parent: NodeType) => boolean
		readonly allowedTypes?: NodeType[]
		readonly disallowedTypes?: NodeType[]
		readonly linkTarget?: string | LinkTargetResolver
		readonly transformLinkUri?: ((uri: string, children?: React.ReactNode, title?: string) => string) | null
		readonly transformImageUri?: ((uri: string, children?: React.ReactNode, title?: string, alt?: string) => string) | null
		readonly unwrapDisallowed?: boolean
		readonly renderers?: { [nodeType: string]: React.ReactType }
		readonly astPlugins?: MdastPlugin[]
		readonly plugins?: any[] | (() => void)
		readonly parserOptions?: Partial<RemarkParseOptions>
	}

	interface RenderProps extends ReactMarkdownProps {
		readonly definitions?: object
	}

	type Renderer<T> = (props: T) => React.ReactElement<T>
	interface Renderers {
		[key: string]: string | Renderer<any>
	}

	interface MarkdownAbstractSyntaxTree {
		align?: AlignType[]
		alt?: string | null
		checked?: boolean | null
		children?: MarkdownAbstractSyntaxTree[]
		data?: { [key: string]: any }
		index?: number
		depth?: number
		height?: number
		identifier?: string
		lang?: string | null
		loose?: boolean
		ordered?: boolean
		position?: Position
		referenceType?: ReferenceType
		start?: number | null
		title?: string | null
		type: string
		url?: string
		value?: string
		width?: number
	}

	type MdastPlugin = (node: MarkdownAbstractSyntaxTree, renderProps?: RenderProps) => MarkdownAbstractSyntaxTree

	export var types: NodeType[]
	export var renderers: Renderers
	export var uriTransformer: (uri: string) => string
}
