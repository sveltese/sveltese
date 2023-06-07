<script lang="ts">
	import { Activity, CreditCard, DollarSign, Github, Users } from 'lucide-svelte'
	import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar'
	import { Button } from '$components/ui/button'
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
		CardFooter
	} from '$components/ui/card'
	import { Label } from '$components/ui/label'
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs'
	import MainNav from './MainNav.svelte'
	import Overview from './Overview.svelte'
	import RecentSales from './RecentSales.svelte'
	import Search from './Search.svelte'
	import type { PageData } from './$types'
	import Logo from '$lib/shared/Logo.svelte'

	export let data: PageData
	const { user } = data
</script>

<!-- <div class="md:hidden">
	<img
		src="/examples/dashboard-light.png"
		width={1280}
		height={866}
		alt="Dashboard"
		class="block dark:hidden"
	/>
	<img
		src="/examples/dashboard-dark.png"
		width={1280}
		height={866}
		alt="Dashboard"
		class="hidden dark:block"
	/>
</div> -->
<div class="hidden flex-col md:flex">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<MainNav class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				<Search />
				<Label>{user.email}</Label>
				<!-- <Avatar className="h-8 w-8">
					<AvatarImage src="/avatars/01.png" alt="@shadcn" />
					<AvatarFallback>{user.email}</AvatarFallback>
				</Avatar> -->
			</div>
		</div>
	</div>
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
			<div class="flex items-center space-x-2">
				<Button size="sm">
					<Github class="mr-2 h-4 w-4" />
					Get Started
				</Button>
			</div>
		</div>
		<Card>
			<CardHeader>
				<CardTitle>
					<div class="flex justify-left items-center my-2">
						<Logo />
						<h1 class=" text-5xl px-9">Svelte SE</h1>
					</div>
				</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	</div>
</div>
