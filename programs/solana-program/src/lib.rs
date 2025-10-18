use anchor_lang::prelude::*;

declare_id!("794WyttcZeD1xWA3aXN4er2DW4JhjS48qigdmGM2cbvL");

#[program]
pub mod solana_program {
    use super::*;

    pub fn initialize_counter (ctx: Context<InitializeCount>) -> Result<()> {
        let counter = &mut ctx.accounts.new_counter;

        counter.count = 0;

        msg!("Counter Initialize");

        emit!(CustomEvent {
            message: "Counter Initialize".to_string(),
        });
        
        Ok(())
    }

    pub fn update_counter(ctx: Context<UpdateCount>, new_count: u8) -> Result<()> {
        let counter = &mut ctx.accounts.counter;

        counter.count = new_count.clone();

        msg!("Counter Updated!!!");

        emit!(CustomEvent{message: "Counter Updated!!!".to_string()});
        
        Ok(())
    }
}

#[event]
pub struct CustomEvent {
    message: String,
}

#[derive(Accounts)]
pub struct InitializeCount<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init, 
        payer = signer,
        seeds = [b"Counter", signer.key().as_ref()],
        bump,
        space = 8 + 4
    )]
    pub new_counter : Account<'info, Counter>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateCount<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut, 
        seeds = [b"Counter", signer.key().as_ref()],
        bump,
    )]
    pub counter : Account<'info, Counter>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Counter {
    pub count: u8,
}
